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
    geo: string;
    ld: number;
    lsicid: string;
    pfevt: string;
    rld: number;
    rlt: string;
    topmenu: string;
}
export declare type TQueue = ((() => void) | TLongboatEvent)[];
export declare interface ICoreProperties {
    aid: number;
    cmpid: string;
    csstatus: boolean;
    ebid: string;
    evid: string;
}
export declare interface IEventProperties {
    ets: number;
    ht: string;
}
export declare interface ISiteProperties {
    bar: boolean;
    bfcache: boolean;
    cid: string;
    nt: string;
    skid: string;
    st: string;
    url: string;
}
export declare interface IUserProperties {
    kh: boolean;
    lis: boolean;
    ssoid: string;
}
/**
 * @description Mandatory properties for all longboat events is the sum of the above
 */
export declare type IMandatoryProps = IEventProperties & ICoreProperties;
declare type cmsaid = string;
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
    vctx: string;
    vet: string;
    vidap: boolean;
    vidban: boolean;
    vidcp: string;
    videid: string;
    viden: string;
    videvtd?: number | 'contentEnd';
    vidid: string;
    vidpid: string;
    vidpn: string;
    vidtype: string;
}
export declare type IVideoEventData = IMandatoryProps & IVideoSpecificProps;
/**
 * @description Object to push to longboat queue
 */
interface ITrackingProperties {
    once?: boolean;
}
/**
 * Event types
 */
export declare interface IPageviewData {
    at: string;
    ekid: string;
    ikid: string;
    ipad?: boolean;
    la: boolean;
    pfs: string;
    ref: string;
}
export declare interface IPageview extends ITrackingProperties {
    eventType: 'pageview';
    data: IPageviewData;
}
export declare interface IContentinviewData {
    cids: number[];
    cmsaid: cmsaid;
    ln: string;
    recom_src?: string;
}
export declare interface IContentinview extends ITrackingProperties {
    eventType: 'contentinview';
    data: IContentinviewData;
}
export declare interface IScrollEventData {
    scroll: number;
}
export declare interface IScrollEvent extends ITrackingProperties {
    eventType: 'scroll';
    data: IScrollEventData;
}
export declare interface IDrEditionClickData {
    areaid: string;
    articleid: string;
    articleurl: string;
    deckid: string;
    editionid: string;
    productid: string;
}
export declare interface IDrEditionClick extends ITrackingProperties {
    eventType: 'dredition';
    data: IDrEditionClickData;
}
declare type TSpacemanagementEventType = 'spacemanagement';
interface ISpacemanagementData {
    cmsaid: cmsaid;
    spm: 'inview' | 'loaded';
}
export declare interface ISpacemanagementLoaded extends ITrackingProperties {
    eventType: TSpacemanagementEventType;
    data: {
        cmsaid: cmsaid;
        spm: 'loaded';
    };
}
export declare interface ISpacemanagementInview extends ITrackingProperties {
    eventType: TSpacemanagementEventType;
    data: {
        cmsaid: cmsaid;
        spm: 'inview';
    };
}
/**
 * External link
 *
 * @description
 * * extlt | external link type
 * * extld | external link destination
 */
interface IExternalLinkData {
    extlt: string;
    extld: string;
}
export declare interface IExternalLink extends ITrackingProperties {
    eventType: 'extlink';
    data: IExternalLinkData;
}
export declare interface IVideoEvent extends ITrackingProperties {
    eventType: 'video';
    data: IVideoEventData;
}
export declare type TLongboatEvent = IContentinview | IDrEditionClick | IExternalLink | IPageview | IScrollEvent | ISpacemanagementInview | ISpacemanagementLoaded | IVideoEvent;
export declare type TLongboatProperties = Partial<IAllLongboatProps>;
export declare interface IAllLongboatProps extends ILongboatVariables, ICoreProperties, IEventProperties, ISiteProperties, IUserProperties, IPageviewData, IContentinviewData, IScrollEventData, IDrEditionClick, ISpacemanagementData, IVideoEventData {
}
export {};
