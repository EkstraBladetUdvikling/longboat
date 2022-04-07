/**
 * Exsiting Longboat properties
 *
 * Konto ID (aid) | Definere hvor data skal sendes hen. Anvendes f.eks. til at indentificerer Politikens Data<br/>
 * Dr Edition - areaId (areaid)<br/>
 * Destinations artikel (articleid) | Artikel ID for den artikle man klikke på
 * Dr Edition - articleUrl (articleurl)
 * Artikeltype (at) | Typen på artiklen. F.eks. galleri, article default. mm
 * Breaking artikel (bar) | er artiklen breaking
 * was bfcache used
 * Artikel ID (cid) | ID på content. I de fleste tilfælde artikel ID
 * Artikel ID liste (cids) | Liste af ID'er på content. I de fleste tilfælde artikel ID
 * CMP UUID (cmpid) | CMP bruger ID
 * Space management (cmsaid) | F.eks.:topbaand_left
 * Consent status (csstatus) | Information om der er sagt OK efterspurgte consent(CookieBot CMP - se dowehaveconsent.ts for consent Types)"
 * Dr Edition - dreDeckId (deckid)
 * EB ID (ebid)
 * Dr Edition - dreEditionId (editionid)
 * Ekstern kampagne id (ekid) | Querystring parameter det indeholder info omkring kilder  brugeren kom fra. Skal aflæses fra querystring “ebcip”
 * Event tidspunkt (ets) | epoc event tidspunkt
 * (evid) | pagespecific uuid
 * Lokalt serviceindhold geo (geo)| Querystring parameter der indeholder eventuelt gemt lokation (optional)
 * Hit type (ht) | indikerer typen af event der trackes, pageview, click etc
 * Internt kampagne id (ikid)| Querystring parameter det indeholder info omkring kilder  brugeren kom fra. Skal aflæses fra querystring “utm_id”
 * iPad | device was ipad
 * +Kunde hit (kh) | Indikerer hvis det er en +kunde der har loadet siden.
 * Låst Artikel (la) | information omkring hvis det er en låst artikle f.eks. +artikel
 * Destinations artikel (ld) | Artikel ID for den artikle man klikke på
 * Indlogget (lis) | True/false om en bruger er indlogget.
 * Liste navn (ln)
 * Lokalt serviceindhold id (lsicid)| Querystring parameter der indeholder id på vist serviceindhold (optional)
 * Native artikel (nt) | Information omkring artiklen er en native artikel
 * Payflow event (pfevt) | User action in payflow
 * payflow step (pfs) | Which step in the payflow was shown
 * Dr Edition - dreProductId (productid)
 * Recommender src (recom_src) | ID på den recommender service der er brugt til at generere listen
 * Referrer (ref)
 * Relateret link destinations artikel (rld) | Artikel ID for den artikle man klikke på
 * Relateret link type (rlt)
 * Hvor langt har brugeren scrollet på artiklen
 * Sektions ID (skid) | ID på den sektion siden høre til. For det meste Esenic home section ID
 * Spacemanagement event (spm) | loaded, inview
 * SSO ID (ssoid) | Single Sign-On fra Medielogin
 * Sidetype (st) | information omkring hvilke sidetype det er. F.eks. artikel eller Sektionsside
 * Which button in menu was clicked
 * Side URL (url) | Siden URL inkl. querystring parms
 */
export interface ILongboatVariables {
  geo: string; // Lokalt serviceindhold geo (geo)| Querystring parameter der indeholder eventuelt gemt lokation (optional)
  ld: number; // Destinations artikel (ld) | Artikel ID for den artikle man klikke på
  lsicid: string; // Lokalt serviceindhold id (lsicid)| Querystring parameter der indeholder id på vist serviceindhold (optional)
  pfevt: string; // Payflow event (pfevt) | User action in payflow
  rld: number; // Relateret link destinations artikel (rld) | Artikel ID for den artikle man klikke på
  rlt: string; // Relateret link type (rlt)

  topmenu: string; // Which button in menu was clicked
}

// As the above is all possible properties, we allow them to be optional
export declare type TLongboatProperties = Partial<ILongboatVariables>;

export declare type TQueue = ((() => void) | ITrackingProperties)[];

// Core data
export declare interface ICoreProperties {
  aid: number; // Konto ID (aid) | Definere hvor data skal sendes hen. Anvendes f.eks. til at indentificerer Politikens Data
  cmpid: string; // CMP UUID (cmpid) | CMP bruger ID
  csstatus: boolean; // Consent status (csstatus) | Information om der er sagt OK efterspurgte consent(CookieBot CMP - se dowehaveconsent.ts for consent Types)"
  ebid: string; // EB ID (ebid)
  evid: string; // (evid) | pagespecific uuid
}

// Data regarding the specific event
export declare interface IEventProperties {
  ets: number; // Event tidspunkt (ets) | epoc event tidspunkt
  ht: string; // Hit type (ht) | indikerer typen af event der trackes, pageview, click etc
}

// Data regarding the site / article
export declare interface ISiteProperties {
  bar: boolean; // Breaking artikel (bar) | er artiklen breaking
  bfcache: boolean; // was bfcache used
  cid: string; // Artikel ID (cid) | ID på content. I de fleste tilfælde artikel ID
  nt: string; // Native artikel (nt) | Information omkring artiklen er en native artikel
  skid: string; // Sektions ID (skid) | ID på den sektion siden høre til. For det meste Esenic home section ID
  st: string; // Sidetype (st) | information omkring hvilke sidetype det er. F.eks. artikel eller Sektionsside
  url: string; // Side URL (url) | Siden URL inkl. querystring parms
}

// Data regarding the current user
export declare interface IUserProperties {
  kh: boolean; // +Kunde hit (kh) | Indikerer hvis det er en +kunde der har loadet siden.
  lis: boolean; // Indlogget (lis) | True/false om en bruger er indlogget.
  ssoid: string; // SSO ID (ssoid) | Single Sign-On fra Medielogin
}

/**
 * @description Mandatory properties for all longboat events is the sum of the above
 */
export declare type IMandatoryProps = IEventProperties & ICoreProperties;

type cmsaid = string; // Space management (cmsaid) | F.eks.:topbaand_left

/**
 * Video tracking
 *
 * @description
 * Video Context (vctx) | in what context is this video embedded
 * Video Event Type (vet) | Video event type
 * Video AutoPlay (vidap) | A boolean value that indicates if autoplay was enabled
 * Video Banner (vidban) | A boolean value that indicates if ad's has been disabled
 * Video Content Provider (vidcp) | A value that indicates the content provider. fx. EB or Discovery. (This is used today on all events)
 * Video Escenic ID (videid) | The CMS ID of the videoclip
 * Video Name (viden) | The CMS name of the Videoclip
 * Video Event Time? (videvtd) | How far did the user get in video, progress in percentage or contentEnd
 * Video ID (vidid) | The ID of the videoclip
 * Video Player ID (vidpid) | The ID of the Videoplayer loaded
 * Video Player Name (vidpn) | The Name of the Videoplayer loaded - currently only JW is used
 * Video Type (vidtype) | Videoclip type
 */
export interface IVideoSpecificProps {
  vctx: string; // in what context is this video embedded
  vet: string; // Video event type
  vidap: boolean; // A boolean value that indicates if autoplay was enabled
  vidban: boolean; // A boolean value that indicates if ad's has been disabled
  vidcp: string; // A value that indicates the content provider. fx. EB or Discovery. (This is used today on all events)
  videid: string; // The CMS ID of the videoclip
  viden: string; // The CMS name of the Videoclip
  videvtd?: number | 'contentEnd'; // How far did the user get in video, progress in percentage or contentEnd
  vidid: string; // The ID of the videoclip
  vidpid: string; // The ID of the Videoplayer loaded
  vidpn: string; // The Name of the Videoplayer loaded - currently only JW is used
  vidtype: string; // Videoclip type
}

export declare type IVideoEventData = IMandatoryProps & IVideoSpecificProps;

/**
 * Event types
 */
// Pageview
export declare interface IPageviewData {
  at: string; // Artikeltype (at) | Typen på artiklen. F.eks. galleri, article default. mm
  ekid: string; // Ekstern kampagne id (ekid) | Querystring parameter det indeholder info omkring kilder  brugeren kom fra. Skal aflæses fra querystring “ebcip”
  ikid: string; // Internt kampagne id (ikid)| Querystring parameter det indeholder info omkring kilder  brugeren kom fra. Skal aflæses fra querystring “utm_id”
  ipad?: boolean; // iPad | device was ipad
  la: boolean; // Låst Artikel (la) | information omkring hvis det er en låst artikle f.eks. +artikel
  pfs: string; // payflow step (pfs) | Which step in the payflow was shown
  ref: string; // Referrer (ref)
}

export declare interface IPageview {
  eventType: 'pageview';
  data: IPageviewData;
}

// Contentinview
export declare interface IContentinviewData {
  cids: number[]; // Artikel ID liste (cids) | Liste af ID'er på content. I de fleste tilfælde artikel ID
  cmsaid: cmsaid;
  ln: string; // Liste navn (ln)
  recom_src?: string; // Recommender src (recom_src) | ID på den recommender service der er brugt til at generere listen
}

export declare interface IContentinview {
  eventType: 'contentinview';
  data: IContentinviewData;
}

// Scroll
export declare interface IScrollEventData {
  scroll: number; // Hvor langt har brugeren scrollet på artiklen
}

export declare interface IScrollEvent {
  eventType: 'scroll';
  data: IScrollEventData;
}

// Dr edition click
export declare interface IDrEditionClickData {
  areaid: string; // Dr Edition - areaId (areaid)
  articleid: string; // Destinations artikel (articleid) | Artikel ID for den artikle man klikke på
  articleurl: string; // Dr Edition - articleUrl (articleurl)
  deckid: string; // Dr Edition - dreDeckId (deckid)
  editionid: string; // Dr Edition - dreEditionId (editionid)
  productid: string; // Dr Edition - dreProductId (productid)
}

export declare interface IDrEditionClick {
  eventType: 'dredition';
  data: IDrEditionClickData;
}

// Spacemanagement
type TSpacemanagementEventType = 'spacemanagement';

// Loaded
export declare interface ISpacemanagementLoaded {
  eventType: TSpacemanagementEventType;
  data: {
    cmsaid: cmsaid;
    spm: 'loaded';
  };
}

// Inview
export declare interface ISpacemanagementInview {
  eventType: TSpacemanagementEventType;
  data: {
    cmsaid: cmsaid;
    spm: 'inview';
  };
}

// Video
export declare interface IVideoEvent {
  eventType: 'video';
  data: IVideoEventData;
}

export type LongboatEvent =
  | IPageview
  | IContentinview
  | IScrollEvent
  | IDrEditionClick
  | ISpacemanagementLoaded
  | ISpacemanagementInview
  | IVideoEvent;

/**
 * @description Object to push to longboat queue
 */
export interface ITrackingProperties extends TLongboatProperties {
  eventType: string;
  once?: boolean;
}
