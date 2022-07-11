import { createInterface } from 'readline';
import { exit, stdin, stdout } from 'process';

import { createTypes } from './createtypes.mjs';

const rl = createInterface({
  input: stdin,
  output: stdout,
});

rl.question(`Is longboat types up to date? [y/n] `, async (answer) => {
  switch (answer.toLowerCase()) {
    case 'y':
    case 'yes':
      exit(0);
    case 'n':
    case 'no':
    default:
      await createTypes();
      exit(0);
  }
});
