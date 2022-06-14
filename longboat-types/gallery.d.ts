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
export type Thumbnail = string;
export type Url = string;

export interface Gallery {
  [k: string]: unknown;
}
/**
 * This interface was referenced by `Gallery`'s JSON-Schema
 * via the `definition` "GalleryClickSchema".
 */
export interface GalleryClickSchema {
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
  thumbnail?: Thumbnail;
  url: Url;
}