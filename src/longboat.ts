interface ILongboatProperties {
  [id: string]: string | number;
}

interface IQueryTrackingObject extends ILongboatProperties {
  ets: number;
  ht: string;
}

interface ITrackingProperties extends ILongboatProperties {
  eventType: string;
}

type TQueue = (() => void | ITrackingProperties)[];

export interface ILongboat {
  properties: ILongboatProperties;
  queue: TQueue;
  ready: () => void;
}

((longboat) => {
  enum ENVIRONMENT {
    'development' = 'development',
    'production' = 'production',
    'staging' = 'staging',
    'test' = 'test',
  }

  class Longboat {
    baseUrl = 'https://longboat.ekstrabladet.dk';
    properties: ILongboatProperties = {
      url: window.location.href,
    };
    prevQueue: TQueue = [];
    queue: TQueue = [];
    readyStatus = false;

    constructor() {
      if (longboat) {
        if (longboat.properties) {
          this.properties = {
            ...this.properties,
            ...longboat.properties,
          };
        }

        if (longboat.queue) this.prevQueue = longboat.queue;
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
     *
     * @param {IQueryTrackingObject} trackingObject
     */
    buildQuery(trackingObject: IQueryTrackingObject) {
      try {
        const queryArray = Object.entries({
          ...this.properties,
          ...trackingObject,
        }).map(([key, value]) => `${key}=${value}`);

        this.send(`?${queryArray.join('&')}`);
      } catch (err) {
        console.error('longboat.buildQuery', err);
      }
    }

    /**
     * @description runs after longboat is initiated, to make sure all functionality is available
     */
    ready() {
      this.readyStatus = true;
      this.resolveQueue(this.prevQueue);
    }

    /**
     * resolveQueue
     *
     * @param {TQueue} queue
     *
     * @description run through queue and handle the added elements
     */
    resolveQueue(queue: TQueue) {
      try {
        while (queue.length) {
          const addedObject = queue.shift();

          if (this.readyStatus) {
            if (typeof addedObject === 'function') {
              addedObject();
            } else if ((addedObject as ITrackingProperties).eventType) {
              this.track(addedObject);
            }
          } else {
            this.prevQueue.push(addedObject);
          }
        }
      } catch (err) {
        console.log('longboat.resolveQueue', err);
      }
    }

    send(query: string) {
      try {
        window.navigator.sendBeacon(this.baseUrl + query);
      } catch (err) {
        console.error('longboat.send', err, 'query', query);
      }
    }

    setEnvironment(environment: ENVIRONMENT) {
      this.baseUrl =
        environment.toLowerCase() === ENVIRONMENT.development || environment.toLowerCase() === ENVIRONMENT.test
          ? 'https://longboat-test.ekstrabladet.dk'
          : this.baseUrl;
    }

    setProperties(propertiesObject: ILongboatProperties) {
      this.properties = { ...this.properties, ...propertiesObject };
    }

    track(trackObj: ITrackingProperties) {
      const { eventType, ...additionalProperties } = trackObj;

      this.buildQuery({
        ets: Date.now(),
        ht: eventType,
        ...additionalProperties,
      });
    }
  }

  window.longboat = new Longboat();
  window.longboat.ready();
})(window.longboat);
