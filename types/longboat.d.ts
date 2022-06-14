import type { TLongboatProperties, TQueue } from './types';
declare enum ENVIRONMENT {
    'debug' = "debug",
    'development' = "development",
    'production' = "production",
    'staging' = "staging",
    'test' = "test",
    'unittest' = "unittest"
}
declare enum LONGBOATURLS {
    'debug' = "",
    'prod' = "https://longboat.ekstrabladet.dk/v1",
    'test' = "https://longboat-test.ekstrabladet.dk/v1"
}
export declare class Longboat {
    exposedQueue: TQueue;
    properties: TLongboatProperties;
    queue: TQueue;
    protected baseUrl: LONGBOATURLS;
    protected environment: keyof typeof ENVIRONMENT;
    protected existingQueue: TQueue;
    protected uniqueEvents: {
        [id: string]: number;
    };
    protected uniqueQueue: string[];
    protected readyStatus: boolean;
    constructor(longboat?: any);
    /**
     * @description runs after longboat is initiated, to make sure all functionality is available
     */
    ready(): void;
    setEnvironment(environment: keyof typeof ENVIRONMENT): void;
    setProperties(propertiesObject: TLongboatProperties): void;
    private buildQuery;
    private isUnique;
    /**
     * resolveQueue
     *
     * @param {TQueue} queue
     *
     * @description run through queue and handle the added elements
     */
    private resolveQueue;
    private send;
    private track;
}
export {};
