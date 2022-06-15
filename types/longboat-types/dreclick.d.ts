/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */
export declare type Aid = number;
export declare type Areaid = string;
export declare type Articleid = string;
export declare type Articleurl = string;
export declare type Bar = boolean;
export declare type Bfcache = boolean | null;
export declare type Cid = string;
export declare type Cmpid = string;
export declare type Cmsaid = string;
export declare type Csstatus = boolean | null;
export declare type Deckid = string;
export declare type Ebid = string;
export declare type Editionid = string;
export declare type Ets = string;
export declare type Evid = string;
export declare type Ht = string;
export declare type Kh = boolean;
export declare type Lis = boolean;
export declare type Nt = string;
export declare type Productid = string;
export declare type ServerGuid = string;
export declare type Skid = number;
export declare type Ssoid = string;
export declare type St = string;
export declare type Url = string;
export interface Dreclick {
    [k: string]: unknown;
}
/**
 * This interface was referenced by `Dreclick`'s JSON-Schema
 * via the `definition` "DrEditionClickSchema".
 */
export interface DrEditionClickSchema {
    aid: Aid;
    areaid?: Areaid;
    articleid?: Articleid;
    articleurl?: Articleurl;
    bar?: Bar;
    bfcache?: Bfcache;
    cid?: Cid;
    cmpid?: Cmpid;
    cmsaid?: Cmsaid;
    csstatus?: Csstatus;
    deckid?: Deckid;
    ebid?: Ebid;
    editionid?: Editionid;
    ets?: Ets;
    evid?: Evid;
    ht: Ht;
    kh?: Kh;
    lis?: Lis;
    nt?: Nt;
    productid?: Productid;
    server_guid?: ServerGuid;
    skid?: Skid;
    ssoid?: Ssoid;
    st?: St;
    url: Url;
}