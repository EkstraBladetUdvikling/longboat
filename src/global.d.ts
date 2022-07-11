import type { Longboat } from './longboat';

declare global {
  interface Window {
    longboat: Longboat;
  }
}
