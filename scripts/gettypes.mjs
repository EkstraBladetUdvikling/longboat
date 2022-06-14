import * as fs from 'fs';
import * as process from 'process';

import { compileFromFile } from 'json-schema-to-typescript';
import fetch from 'node-fetch';

const runtimeArguments = process.argv.slice(2);
console.log('runtimeArguments', runtimeArguments);
async function asyncForEach(array, callback) {
  if (array.length) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}

(async () => {
  const baseUrl = 'https://longboat-test.ekstrabladet.dk/schemas';
  // runtimeArguments.indexOf('--test') !== -1
  //   ? 'https://longboat-test.ekstrabladet.dk/schemas'
  //   : 'https://longboat.ekstrabladet.dk/schemas';

  const filesToConvert = [];
  const result = await fetch(baseUrl);
  const outDirSchemas = 'longboat-schemas';
  if (!fs.existsSync(outDirSchemas)) {
    fs.mkdirSync(outDirSchemas);
  }
  if (result.status === 200) {
    const schemaNames = await result.json();

    await asyncForEach(schemaNames, async (schemaName) => {
      const schemaFetch = await fetch(`${baseUrl}/${schemaName}`);

      if (schemaFetch.status === 200) {
        const schemaJSON = await schemaFetch.json();
        const schemaPath = `${outDirSchemas}/${schemaName}.json`;
        fs.writeFileSync(schemaPath, JSON.stringify(schemaJSON));
        filesToConvert.push({ schemaName, schemaPath });
      }
    });
  }

  const convertPromises = [];
  const outDirTypes = 'longboat-types';
  if (!fs.existsSync(outDirTypes)) {
    fs.mkdirSync(outDirTypes);
  }
  filesToConvert.forEach((fileObj) => {
    convertPromises.push(
      compileFromFile(fileObj.schemaPath, { declareExternallyReferenced: true, unreachableDefinitions: true })
        .then((ts) => {
          console.log('ts', fileObj.schemaName);
          if (fileObj.schemaName === 'pageview') {
            // console.log('ts', ts);
          }
          fs.writeFileSync(`${outDirTypes}/${fileObj.schemaName}.d.ts`, ts);
          return { file: fileObj.schemaName, status: 'success' };
        })
        .catch((err) => {
          console.error(err);
          return { file: fileObj.schemaName, status: 'error' };
        })
    );
  });

  Promise.all(convertPromises).then((values) => {
    const errors = values.filter((val) => val.status === 'error');
    if (errors.length) {
      console.log(errors);
    } else {
      console.log('Succesfully converted all');
    }
  });
})();
