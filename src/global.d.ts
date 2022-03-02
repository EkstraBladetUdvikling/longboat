import type { ILongboat } from './longboat';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window {
    longboat: ILongboat;
  }
}
