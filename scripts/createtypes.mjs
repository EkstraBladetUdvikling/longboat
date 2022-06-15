import * as fs from 'fs';
import * as process from 'process';

import { compileFromFile } from 'json-schema-to-typescript';
import fetch from 'node-fetch';

const runtimeArguments = process.argv.slice(2);

async function asyncForEach(array, callback) {
  if (array.length) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}

export async function createTypes() {
  const env = runtimeArguments.indexOf('--test') !== -1 ? 'TEST' : 'PROD';
  const baseUrl =
    env === 'TEST' ? 'https://longboat-test.ekstrabladet.dk/schemas' : 'https://longboat.ekstrabladet.dk/schemas';

  console.log('Creating longboat types from:', env);

  const filesToConvert = [];
  const result = await fetch(baseUrl);
  const outDirSchemas = 'longboat-schemas';
  if (!fs.existsSync(outDirSchemas)) {
    fs.mkdirSync(outDirSchemas);
  }
  if (result.status === 200) {
    const schemaNames = await result.json();
    schemaNames.sort();
    await asyncForEach(schemaNames, async (schemaName) => {
      const schemaFetch = await fetch(`${baseUrl}/${schemaName}`);

      if (schemaFetch.status === 200) {
        const schemaJSON = await schemaFetch.json();
        const schemaPath = `${outDirSchemas}/${schemaName}.schema.json`;
        const schemaTypeName = Object.keys(schemaJSON.definitions)[0];

        fs.writeFileSync(schemaPath, JSON.stringify(schemaJSON));
        filesToConvert.push({ schemaName, schemaPath, schemaTypeName });
      }
    });
  }

  const interfaceExports = [];
  const interfacePartials = [];
  const interfaceExtendedNames = [];
  const convertPromises = [];
  const outDirTypes = 'types';
  if (!fs.existsSync(outDirTypes)) {
    fs.mkdirSync(outDirTypes);
  }
  const outDirLongboat = `${outDirTypes}/longboat-types`;
  if (!fs.existsSync(outDirLongboat)) {
    fs.mkdirSync(outDirLongboat);
  }
  filesToConvert.forEach((fileObj) => {
    const { schemaName, schemaPath, schemaTypeName } = fileObj;
    convertPromises.push(
      compileFromFile(schemaPath, { declareExternallyReferenced: true, unreachableDefinitions: true })
        .then((ts) => {
          fs.writeFileSync(`${outDirLongboat}/${schemaName}.d.ts`, ts);
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
  data: ${schemaTypeName};
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

export declare type IAllLongboatProps = ${interfacePartials.join('|')};
`;

  fs.writeFileSync(`${outDirLongboat}/index.d.ts`, indexContent);
  Promise.all(convertPromises).then((values) => {
    const errors = values.filter((val) => val.status === 'error');
    if (errors.length) {
      console.log(errors);
      process.exit(1);
    } else {
      console.log('Succesfully converted all');
    }
  });
}

if (runtimeArguments.indexOf('--run') !== -1) {
  createTypes();
}
