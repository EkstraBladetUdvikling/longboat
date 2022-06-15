/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type Aid = number;
export type Bar = boolean;
export type Bfcache = boolean | null;
export type Cid = string;
export type Cmpid = string;
export type Cmsaid = string;
export type Csstatus = boolean | null;
export type Ebid = string;
export type El1 = string;
export type El2 = string;
export type El3 = string;
export type El4 = string;
export type Ets = string;
export type Evid = string;
export type Ht = string;
export type Kh = boolean;
export type Lis = boolean;
export type Nt = string;
export type Pfs = string;
export type ServerGuid = string;
export type Skid = number;
export type Ssoid = string;
export type St = string;
export type Url = string;

export interface Event {
  [k: string]: unknown;
}
/**
 * This interface was referenced by `Event`'s JSON-Schema
 * via the `definition` "EventSchema".
 */
export interface EventSchema {
  aid: Aid;
  bar?: Bar;
  bfcache?: Bfcache;
  cid?: Cid;
  cmpid?: Cmpid;
  cmsaid?: Cmsaid;
  csstatus?: Csstatus;
  ebid?: Ebid;
  el1?: El1;
  el2?: El2;
  el3?: El3;
  el4?: El4;
  ets?: Ets;
  evid?: Evid;
  ht: Ht;
  kh?: Kh;
  lis?: Lis;
  nt?: Nt;
  pfs?: Pfs;
  server_guid?: ServerGuid;
  skid?: Skid;
  ssoid?: Ssoid;
  st?: St;
  url: Url;
}
