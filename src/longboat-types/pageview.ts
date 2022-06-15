/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type Aid = number;
export type At = string;
export type Bar = boolean;
export type Bfcache = boolean | null;
export type Cid = string;
export type Cmpid = string;
export type Csstatus = boolean | null;
export type Ebid = string;
export type Ekid = string;
export type Ets = string;
export type Evid = string;
export type Geo = string;
export type Ht = string;
export type Ikid = string;
export type Ipad = boolean | null;
export type Kh = boolean;
export type La = boolean;
export type Lis = boolean;
export type Lsicid = string;
export type Nt = string;
export type Pfs = string;
export type Ref = string;
export type ServerGuid = string;
export type Skid = number;
export type Ssoid = string;
export type St = string;
export type Url = string;

export interface Pageview {
  [k: string]: unknown;
}
/**
 * This interface was referenced by `Pageview`'s JSON-Schema
 * via the `definition` "PageviewSchema".
 */
export interface PageviewSchema {
  aid: Aid;
  at?: At;
  bar?: Bar;
  bfcache?: Bfcache;
  cid?: Cid;
  cmpid?: Cmpid;
  csstatus?: Csstatus;
  ebid?: Ebid;
  ekid?: Ekid;
  ets?: Ets;
  evid?: Evid;
  geo?: Geo;
  ht: Ht;
  ikid?: Ikid;
  ipad?: Ipad;
  kh?: Kh;
  la?: La;
  lis?: Lis;
  lsicid?: Lsicid;
  nt?: Nt;
  pfs?: Pfs;
  ref?: Ref;
  server_guid?: ServerGuid;
  skid?: Skid;
  ssoid?: Ssoid;
  st?: St;
  url: Url;
}
