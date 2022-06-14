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
export type Csstatus = boolean | null;
export type Ebid = string;
export type Ets = string;
export type Evid = string;
export type Ht = string;
export type Kh = boolean;
export type Lis = boolean;
export type Nt = string;
export type ServerGuid = string;
export type Skid = number;
export type Ssoid = string;
export type St = string;
export type Topmenu1 = string;
export type Url = string;

export interface Topmenu {
  [k: string]: unknown;
}
/**
 * This interface was referenced by `Topmenu`'s JSON-Schema
 * via the `definition` "TopmenuSchema".
 */
export interface TopmenuSchema {
  aid: Aid;
  bar?: Bar;
  bfcache?: Bfcache;
  cid?: Cid;
  cmpid?: Cmpid;
  csstatus?: Csstatus;
  ebid?: Ebid;
  ets?: Ets;
  evid?: Evid;
  ht: Ht;
  kh?: Kh;
  lis?: Lis;
  nt?: Nt;
  server_guid?: ServerGuid;
  skid?: Skid;
  ssoid?: Ssoid;
  st?: St;
  topmenu?: Topmenu1;
  url: Url;
}