import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { argv, exit } from 'process';

import { compileFromFile } from 'json-schema-to-typescript';
import fetch from 'node-fetch';

const runtimeArguments = argv.slice(2);

async function asyncForEach(array, callback) {
  if (array.length) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}

export async function createTypes() {
  const env = runtimeArguments.indexOf('--test') !== -1 ? 'TEST' : 'PROD';

  const outDirSchemas = 'longboat-schemas';
  const typesCacheFile = 'cache.json';

  const useCachedFiles =
    runtimeArguments.indexOf('--cached') !== -1 && existsSync(`${outDirSchemas}/${typesCacheFile}`);

  const baseUrl =
    env === 'TEST' ? 'https://longboat-test.ekstrabladet.dk/schemas' : 'https://longboat.ekstrabladet.dk/schemas';

  console.log('Creating longboat types from:', useCachedFiles ? 'CACHE' : env);

  const filesToConvert = [];

  if (useCachedFiles) {
    const cached = readFileSync(`${outDirSchemas}/${typesCacheFile}`);
    filesToConvert.push(...JSON.parse(cached));
  } else {
    const result = await fetch(baseUrl);

    if (!existsSync(outDirSchemas)) {
      mkdirSync(outDirSchemas);
    }
    if (result.status === 200 || useCachedFiles) {
      const schemaNames = await result.json();
      schemaNames.sort();
      await asyncForEach(schemaNames, async (schemaName) => {
        const schemaFetch = await fetch(`${baseUrl}/${schemaName}`);

        if (schemaFetch.status === 200) {
          const schemaJSON = await schemaFetch.json();
          const schemaPath = `${outDirSchemas}/${schemaName}.schema.json`;
          const schemaTypeName = Object.keys(schemaJSON.definitions)[0];

          writeFileSync(schemaPath, JSON.stringify(schemaJSON));
          filesToConvert.push({ schemaName, schemaPath, schemaTypeName });
        }
      });
    }
  }

  const interfaceExports = [];
  const interfacePartials = [];
  const interfaceExtendedNames = [];
  const convertPromises = [];
  const outDirTypes = 'types';
  if (!existsSync(outDirTypes)) {
    mkdirSync(outDirTypes);
  }
  const outDirLongboat = `${outDirTypes}/longboat-types`;
  if (!existsSync(outDirLongboat)) {
    mkdirSync(outDirLongboat);
  }
  filesToConvert.forEach((fileObj) => {
    const { schemaName, schemaPath, schemaTypeName } = fileObj;
    convertPromises.push(
      compileFromFile(schemaPath, { declareExternallyReferenced: true, unreachableDefinitions: true })
        .then((ts) => {
          writeFileSync(`${outDirLongboat}/${schemaName}.d.ts`, ts);
          return { file: schemaName, status: 'success' };
        })
        .catch((err) => {
          console.error(err);
          return { file: schemaName, status: 'error' };
        })
    );
    interfaceExports.push(`export type { ${schemaTypeName} } from './${schemaName}';
  import type { ${schemaTypeName} } from './${schemaName}';
  export declare interface IExtended${schemaTypeName} {
    data: Partial<${schemaTypeName}>;
    eventType: '${schemaName}';
    once?: boolean;
  }
  `);
    interfacePartials.push(`${schemaTypeName}`);
    interfaceExtendedNames.push(`IExtended${schemaTypeName}`);
  });

  const indexContent = `/* tslint:disable */
  /**
   * WARNING!
   * This is an autogenerated file. Created by scripts/createtypes.mjs
   * Do NOT edit by hand!
   */
  ${interfaceExports.join('')}
  export type TLongboatEvent = ${interfaceExtendedNames.join('|')};

  export declare type TAllLongboatProps = ${interfacePartials.join('|')};
  `;

  writeFileSync(`${outDirLongboat}/index.d.ts`, indexContent);
  Promise.all(convertPromises).then((values) => {
    const errors = values.filter((val) => val.status === 'error');
    if (errors.length) {
      console.log(errors);
      exit(1);
    } else {
      console.log('Succesfully converted all');
    }
  });

  if (!useCachedFiles) writeFileSync(`${outDirSchemas}/${typesCacheFile}`, JSON.stringify(filesToConvert));
}

if (runtimeArguments.indexOf('--run') !== -1) {
  createTypes();
}
