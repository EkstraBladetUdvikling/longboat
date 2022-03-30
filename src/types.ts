export interface ILongboatVariables {
  aid: number;
  at: string;
  bar: boolean;
  bfcache: boolean;
  cid: string;
  cids: number[];
  cmpid: string;
  cmsaid: string;
  csstatus: boolean;
  device: string;
  ebid: string;
  ekid: string;
  ets: number;
  evid: string;
  environment: string;
  geo: string;
  ht: string;
  ikid: string;
  ipad: boolean;
  kh: boolean;
  la: boolean;
  lis: boolean;
  ln: string;
  lsicid: string;
  nt: string;
  pfs: string;
  recom_src: string;
  ref: string;
  restricted: boolean;
  scroll: number;
  skid: string;
  ssoid: string;
  st: string;
  url: string;
}
declare type ISiteProperties = Pick<ILongboatVariables, 'bar' | 'bfcache' | 'cid' | 'nt' | 'skid' | 'st' | 'url'>;
declare type IEventProperties = Pick<ILongboatVariables, 'ets' | 'ht'>;
declare type ICoreProperties = Pick<ILongboatVariables, 'aid' | 'cmpid' | 'csstatus' | 'ebid' | 'evid'>;
declare type IUserProperties = Pick<ILongboatVariables, 'kh' | 'lis' | 'ssoid'>;
export declare type IMandatoryProps = ISiteProperties & IEventProperties & ICoreProperties & IUserProperties;
/**
 * Event types
 */
export declare type IPageviewData = IMandatoryProps &
  Pick<ILongboatVariables, 'at' | 'ekid' | 'ikid' | 'ipad' | 'la' | 'pfs' | 'ref'>;
export declare type IContentinviewData = IMandatoryProps &
  Pick<ILongboatVariables, 'cids' | 'cmsaid' | 'ln' | 'recom_src'>;
export declare type IScrollEventData = IMandatoryProps & Pick<ILongboatVariables, 'scroll'>;
export interface IVideoSpecificProps {
  vet: string;
  vidpid: string;
  vidpn: 'JW';
  vidid: string;
  videid: string;
  viden: string;
  videvtd?: number;
  vidtype: string;
  vidban: boolean;
  vidap: boolean;
  vidcp: string;
  vctx: string;
}
export declare type IVideoEventData = IMandatoryProps & IVideoSpecificProps;
export declare type TLongboatProperties = Partial<ILongboatVariables>;
export interface ITrackingProperties extends TLongboatProperties {
  eventType: string;
  once?: boolean;
}
export declare type TQueue = ((() => void) | ITrackingProperties)[];
