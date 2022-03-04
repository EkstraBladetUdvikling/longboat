interface ILongboatProperties {
  [id: string]: boolean | number | string;
}

interface IQueryTrackingObject extends ILongboatProperties {
  ht: string;
}

interface ITrackingProperties extends ILongboatProperties {
  eventType: string;
  once?: boolean;
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

  function validateProperties(checkProps: Partial<ILongboatProperties>) {
    const status = ['aid', 'ht'].find(
      (prop) => !checkProps.hasOwnProperty(prop)
    );
    return !status;
  }

  class Longboat {
    public queue: TQueue = [];

    protected baseUrl = 'https://longboat.ekstrabladet.dk';
    properties: ILongboatProperties = {
      url: window.location.href,
    };
    protected existingQueue: TQueue = [];
    protected uniqueQueue: string[] = [];
    protected readyStatus = false;

    constructor() {
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

    public setEnvironment(environment: ENVIRONMENT) {
      this.baseUrl =
        environment.toLowerCase() === ENVIRONMENT.development ||
        environment.toLowerCase() === ENVIRONMENT.test
          ? 'https://longboat-test.ekstrabladet.dk'
          : this.baseUrl;
    }

    public setProperties(propertiesObject: ILongboatProperties) {
      this.properties = { ...this.properties, ...propertiesObject };
    }

    /**
     *
     * @param {IQueryTrackingObject} trackingObject
     */
    private buildQuery(trackingObject: IQueryTrackingObject, once = true) {
      try {
        if (once && !this.isUnique(trackingObject)) {
          throw new Error(
            `This has been tracked already ${trackingObject.ht} - ${trackingObject}`
          );
        }

        const queryObject = {
          ...this.properties,
          ...trackingObject,
          ets: Date.now(),
        };

        if (!validateProperties(queryObject)) {
          throw new Error('Missing mandatory properties');
        }

        const queryArray = Object.entries(queryObject).map(
          ([key, value]) => `${key}=${value}`
        );

        this.send(`?${queryArray.join('&')}`);
      } catch (err) {
        console.error('longboat.buildQuery', err);
      }
    }

    private isUnique(trackingObject: IQueryTrackingObject) {
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

          if (this.readyStatus) {
            if (typeof addedObject === 'function') {
              addedObject();
            } else if ((addedObject as ITrackingProperties).eventType) {
              this.track(addedObject);
            }
          } else {
            this.existingQueue.push(addedObject);
          }
        }
      } catch (err) {
        console.log('longboat.resolveQueue', err);
      }
    }

    private send(query: string) {
      try {
        window.navigator.sendBeacon(this.baseUrl + query);
      } catch (err) {
        console.error('longboat.send', err, 'query', query);
      }
    }

    private track(trackObj: ITrackingProperties) {
      const { eventType, once, ...additionalProperties } = trackObj;

      this.buildQuery(
        {
          ht: eventType,
          ...additionalProperties,
        },
        once
      );
    }
  }

  window.longboat = new Longboat();
  window.longboat.ready();
})(window.longboat);
