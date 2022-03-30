export interface ILongboatVariables {
  aid: number; // Konto ID (aid) | Definere hvor data skal sendes hen. Anvendes f.eks. til at indentificerer Politikens Data
  areaid: string; // Dr Edition - areaId (areaid)
  articleid: string; // Destinations artikel (articleid) | Artikel ID for den artikle man klikke på
  articleurl: string; // Dr Edition - articleUrl (articleurl)
  at: string; // Artikeltype (at) | Typen på artiklen. F.eks. galleri, article default. mm
  bar: boolean; // Breaking artikel (bar) | er artiklen breaking
  bfcache: boolean; // was bfcache used
  cid: string; // Artikel ID (cid) | ID på content. I de fleste tilfælde artikel ID
  cids: number[]; // Artikel ID liste (cids) | Liste af ID'er på content. I de fleste tilfælde artikel ID
  cmpid: string; // CMP UUID (cmpid) | CMP bruger ID
  cmsaid: string; // Space management (cmsaid) | F.eks.:topbaand_left
  csstatus: boolean; // Consent status (csstatus) | Information om der er sagt OK efterspurgte consent(CookieBot CMP - se dowehaveconsent.ts for consent Types)"
  deckid: string; // Dr Edition - dreDeckId (deckid)
  ebid: string; // EB ID (ebid)
  editionid: string; // Dr Edition - dreEditionId (editionid)
  ekid: string; // Ekstern kampagne id (ekid) | Querystring parameter det indeholder info omkring kilder  brugeren kom fra. Skal aflæses fra querystring “ebcip”
  ets: number; // Event tidspunkt (ets) | epoc event tidspunkt
  evid: string; // (evid) | pagespecific uuid
  geo: string; // Lokalt serviceindhold geo (geo)| Querystring parameter der indeholder eventuelt gemt lokation (optional)
  ht: string; // Hit type (ht) | indikerer typen af event der trackes, pageview, click etc
  ikid: string; // Internt kampagne id (ikid)| Querystring parameter det indeholder info omkring kilder  brugeren kom fra. Skal aflæses fra querystring “utm_id”
  ipad: boolean; // iPad | device was ipad
  kh: boolean; // +Kunde hit (kh) | Indikerer hvis det er en +kunde der har loadet siden.
  la: boolean; // Låst Artikel (la) | information omkring hvis det er en låst artikle f.eks. +artikel
  ld: number; // Destinations artikel (ld) | Artikel ID for den artikle man klikke på
  lis: boolean; // Indlogget (lis) | True/false om en bruger er indlogget.
  ln: string; // Liste navn (ln)
  lsicid: string; // Lokalt serviceindhold id (lsicid)| Querystring parameter der indeholder id på vist serviceindhold (optional)
  nt: string; // Native artikel (nt) | Information omkring artiklen er en native artikel
  pfevt: string; // Payflow event (pfevt) | User action in payflow
  pfs: string; // payflow step (pfs) | Which step in the payflow was shown
  productid: string; // Dr Edition - dreProductId (productid)
  recom_src: string; // Recommender src (recom_src) | ID på den recommender service der er brugt til at generere listen
  ref: string; // Referrer (ref)
  rld: number; // Relateret link destinations artikel (rld) | Artikel ID for den artikle man klikke på
  rlt: string; // Relateret link type (rlt)
  scroll: number; // Hvor langt har brugeren scrollet på artiklen
  skid: string; // Sektions ID (skid) | ID på den sektion siden høre til. For det meste Esenic home section ID
  spm: string; // Spacemanagement event (spm) | loaded, inview
  ssoid: string; // SSO ID (ssoid) | Single Sign-On fra Medielogin
  st: string; // Sidetype (st) | information omkring hvilke sidetype det er. F.eks. artikel eller Sektionsside
  topmenu: string; // Which button in menu was clicked
  url: string; // Side URL (url) | Siden URL inkl. querystring parms
}

// As the above is all possible properties, we allow them to be optional
export declare type TLongboatProperties = Partial<ILongboatVariables>;

// Object to push to longboat queue
export interface ITrackingProperties extends TLongboatProperties {
  eventType: string;
  once?: boolean;
}

export declare type TQueue = ((() => void) | ITrackingProperties)[];

// Core data
declare type ICoreProperties = Pick<ILongboatVariables, 'aid' | 'cmpid' | 'csstatus' | 'ebid' | 'evid'>;
// Data regarding the specific event
declare type IEventProperties = Pick<ILongboatVariables, 'ets' | 'ht'>;
// Data regarding the site / article
declare type ISiteProperties = Pick<ILongboatVariables, 'bar' | 'bfcache' | 'cid' | 'nt' | 'skid' | 'st' | 'url'>;
// Data regarding the current user
declare type IUserProperties = Pick<ILongboatVariables, 'kh' | 'lis' | 'ssoid'>;
// Mandatory properties for all longboat events is the sum of the above
export declare type IMandatoryProps = ISiteProperties & IEventProperties & ICoreProperties & IUserProperties;

/**
 * Event types
 */
// Pageview
export declare type IPageviewData = IMandatoryProps &
  Pick<ILongboatVariables, 'at' | 'ekid' | 'ikid' | 'ipad' | 'la' | 'pfs' | 'ref'>;

// Contentinview
export declare type IContentinviewData = IMandatoryProps &
  Pick<ILongboatVariables, 'cids' | 'cmsaid' | 'ln' | 'recom_src'>;

// Scroll
export declare type IScrollEventData = IMandatoryProps & Pick<ILongboatVariables, 'scroll'>;

// Dr edition click
export declare type IDrEditionClick = IMandatoryProps &
  Pick<ILongboatVariables, 'areaid' | 'articleid' | 'articleurl' | 'cmsaid' | 'deckid' | 'editionid' | 'productid'>;

// Spacemanagement
export declare type ISpacemanagementLoaded = IMandatoryProps & Pick<ILongboatVariables, 'cmsaid' | 'spm'>;

// Spacemanagement inview
export declare type ISpacemanagementInview = IMandatoryProps & Pick<ILongboatVariables, 'cmsaid' | 'spm'>;

// Video tracking
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
