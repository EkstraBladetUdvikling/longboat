import type { IAllLongboatProps, TLongboatEvent } from '../types/longboat-types';

declare type TQueue = ((() => void) | TLongboatEvent)[];

enum ENVIRONMENT {
  'debug' = 'debug',
  'development' = 'development',
  'production' = 'production',
  'staging' = 'staging',
  'test' = 'test',
  'unittest' = 'unittest',
}

enum LONGBOATURLS {
  'debug' = '',
  'prod' = 'https://longboat.ekstrabladet.dk/v1',
  'test' = 'https://longboat-test.ekstrabladet.dk/v1',
}

function validateProperties(checkProps: IAllLongboatProps) {
  const status = ['aid', 'ht'].find((prop) => !checkProps[prop]);
  return !status;
}

export class Longboat {
  public exposedQueue: TQueue = [];
  public properties: IAllLongboatProps = {
    url: encodeURIComponent(window.location.href),
  };
  public queue: TQueue = [];

  protected baseUrl: LONGBOATURLS = LONGBOATURLS.prod;
  protected environment: keyof typeof ENVIRONMENT = ENVIRONMENT.production;
  protected existingQueue: TQueue = [];
  protected uniqueEvents: { [id: string]: number } = {};
  protected uniqueQueue: string[] = [];
  protected readyStatus = false;

  constructor(longboat?) {
    if (longboat) {
      if (longboat.properties) {
        this.properties = {
          ...this.properties,
          ...longboat.properties,
        };
      }

      if (longboat.queue) this.existingQueue = longboat.queue;
    }

    Object.defineProperty(this.queue, 'push', {
      configurable: false, // prevent further meddling...
      enumerable: false, // hide from for...in
      value: (...args: any[]) => {
        this.resolveQueue(args);
        return args.length;
      },
      writable: false, // see above ^
    });
  }

  /**
   * @description runs after longboat is initiated, to make sure all functionality is available
   */
  public ready() {
    this.readyStatus = true;
    this.resolveQueue(this.existingQueue);
  }

  public setEnvironment(environment: keyof typeof ENVIRONMENT): void {
    switch (environment.toLowerCase()) {
      case ENVIRONMENT.debug:
        this.baseUrl = LONGBOATURLS.debug;
        break;
      case ENVIRONMENT.development:
      case ENVIRONMENT.test:
        this.baseUrl = LONGBOATURLS.test;
        break;
      case ENVIRONMENT.production:
      case ENVIRONMENT.staging:
      default:
        this.baseUrl = LONGBOATURLS.prod;
        break;
    }
    this.environment = environment;
  }

  public setProperties(propertiesObject: IAllLongboatProps): void {
    try {
      this.properties = { ...this.properties, ...propertiesObject };
    } catch (err) {
      console.error('longboat.setProperties', err);
    }
  }

  private buildQuery(trackingObject: IAllLongboatProps, once = true) {
    try {
      if (once && !this.isUnique(trackingObject)) {
        console.warn(`This has been tracked already ${trackingObject.ht} - ${JSON.stringify(trackingObject)}`);
        return;
      }

      const queryObject = {
        ets: new Date().toISOString(),
        ...this.properties,
        ...trackingObject,
      };

      if (!validateProperties(queryObject)) {
        console.warn('Missing mandatory properties', queryObject);
        return;
      }

      // const queryArray = Object.entries(queryObject).map(([key, value]) => `${key}=${value}`);

      this.send(queryObject);
    } catch (err) {
      console.error('longboat.buildQuery', err);
    }
  }

  private isUnique(trackingObject: IAllLongboatProps) {
    const trackingObjectString = JSON.stringify(trackingObject);
    const exists = this.uniqueQueue.find((el) => el === trackingObjectString);
    if (exists) return false;

    this.uniqueQueue.push(trackingObjectString);
    return true;
  }

  /**
   * resolveQueue
   *
   * @param {TQueue} queue
   *
   * @description run through queue and handle the added elements
   */
  private resolveQueue(queue: TQueue) {
    try {
      while (queue.length) {
        const addedObject = queue.shift();
        if (this.environment === ENVIRONMENT.debug) {
          this.exposedQueue.push(addedObject);
        }
        if (this.readyStatus) {
          if (typeof addedObject === 'function') {
            addedObject();
          } else if ((addedObject as TLongboatEvent).eventType) {
            this.track(addedObject);
          }
        } else {
          this.existingQueue.push(addedObject);
        }
      }
    } catch (err) {
      console.error('longboat.resolveQueue', err);
    }
  }

  private send(sendObject: IAllLongboatProps) {
    try {
      if (this.baseUrl === LONGBOATURLS.debug) {
        console.debug('send this:', sendObject);
      } else {
        const sendBlop = new Blob([JSON.stringify(sendObject)], { type: 'application/json' });
        window.navigator.sendBeacon(this.baseUrl, sendBlop);
      }
    } catch (err) {
      console.error('longboat.send', err, 'query', sendObject);
    }
  }

  private track(trackObj: TLongboatEvent) {
    const { data, eventType, once } = trackObj;
    this.uniqueEvents[eventType] = this.uniqueEvents[eventType] || 0;
    this.uniqueEvents[eventType]++;
    this.buildQuery(
      {
        ht: eventType,
        ...data,
      },
      once
    );
  }
}
