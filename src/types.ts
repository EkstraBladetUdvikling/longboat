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

type ISiteProperties = Pick<
  ILongboatVariables,
  'bar' | 'bfcache' | 'cid' | 'nt' | 'skid' | 'st' | 'url'
>;

type IEventProperties = Pick<ILongboatVariables, 'ets' | 'ht'>;

type ICoreProperties = Pick<
  ILongboatVariables,
  'aid' | 'cmpid' | 'csstatus' | 'ebid' | 'evid'
>;

type IUserProperties = Pick<ILongboatVariables, 'kh' | 'lis' | 'ssoid'>;

export type IMandatoryProps = ISiteProperties &
  IEventProperties &
  ICoreProperties &
  IUserProperties;

/**
 * Event types
 */

export type IPageviewData = IMandatoryProps &
  Pick<
    ILongboatVariables,
    'at' | 'ekid' | 'ikid' | 'ipad' | 'la' | 'pfs' | 'ref'
  >;

export type IContentinviewData = IMandatoryProps &
  Pick<ILongboatVariables, 'cids' | 'cmsaid' | 'ln' | 'recom_src'>;

export type IScrollEventData = IMandatoryProps &
  Pick<ILongboatVariables, 'scroll'>;

export interface IVideoSpecificProps {
  vet: string; // Video event name
  vidpid: string; // <%--The ID of the Videoplayer loaded--%>
  vidpn: 'JW'; // <%--The Name of the Videoplayer loaded--%>
  vidid: string; // <%--The ID of the videoclip--%>
  videid: string; // <%--The CMS ID of the videoclip--%>
  viden: string; // <%--The CMS name of the Videoclip--%>
  videvtd?: number; // Video viewing progress
  vidtype: string; // <%--Videoclip type--%>
  vidban: boolean; // <%--A boolean value that indicates if ad's has been disabled--%>
  vidap: boolean; // <%--A boolean value that indicates if autoplay was enabled--%>
  vidcp: string; // <%--A value that indicates the content provider. fx. EB or Discovery. (This is used today on all events)--%>
  vctx: string; // <%-- in what context is this video embedded --%>
}

export type IVideoEventData = IMandatoryProps & IVideoSpecificProps;

export type TLongboatProperties = Partial<ILongboatVariables>;

export interface ITrackingProperties extends TLongboatProperties {
  eventType: string;
  once?: boolean;
}

export type TQueue = ((() => void) | ITrackingProperties)[];
