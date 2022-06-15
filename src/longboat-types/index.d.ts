/**
   * WARNING!
   * This is an autogenerated file.
   * Do NOT edit by hand!
   */
  export type { ArtikelInviewSchema } from './artikel-inview';
  import type { ArtikelInviewSchema } from './artikel-inview';
  export declare interface IExtendedArtikelInviewSchema {
    data: ArtikelInviewSchema;
    eventType: 'artikel-inview';
    once?: boolean;
  }
  export type { ContentInviewSchema } from './contentinview';
  import type { ContentInviewSchema } from './contentinview';
  export declare interface IExtendedContentInviewSchema {
    data: ContentInviewSchema;
    eventType: 'contentinview';
    once?: boolean;
  }
  export type { DrEditionClickSchema } from './dreclick';
  import type { DrEditionClickSchema } from './dreclick';
  export declare interface IExtendedDrEditionClickSchema {
    data: DrEditionClickSchema;
    eventType: 'dreclick';
    once?: boolean;
  }
  export type { EventSchema } from './event';
  import type { EventSchema } from './event';
  export declare interface IExtendedEventSchema {
    data: EventSchema;
    eventType: 'event';
    once?: boolean;
  }
  export type { ExternalLinksSchema } from './extlink';
  import type { ExternalLinksSchema } from './extlink';
  export declare interface IExtendedExternalLinksSchema {
    data: ExternalLinksSchema;
    eventType: 'extlink';
    once?: boolean;
  }
  export type { GalleryClickSchema } from './gallery';
  import type { GalleryClickSchema } from './gallery';
  export declare interface IExtendedGalleryClickSchema {
    data: GalleryClickSchema;
    eventType: 'gallery';
    once?: boolean;
  }
  export type { ListeClicksSchema } from './lists';
  import type { ListeClicksSchema } from './lists';
  export declare interface IExtendedListeClicksSchema {
    data: ListeClicksSchema;
    eventType: 'lists';
    once?: boolean;
  }
  export type { MitEbSchema } from './miteb';
  import type { MitEbSchema } from './miteb';
  export declare interface IExtendedMitEbSchema {
    data: MitEbSchema;
    eventType: 'miteb';
    once?: boolean;
  }
  export type { PageviewSchema } from './pageview';
  import type { PageviewSchema } from './pageview';
  export declare interface IExtendedPageviewSchema {
    data: PageviewSchema;
    eventType: 'pageview';
    once?: boolean;
  }
  export type { PixelInviewSchema } from './pixel-inview';
  import type { PixelInviewSchema } from './pixel-inview';
  export declare interface IExtendedPixelInviewSchema {
    data: PixelInviewSchema;
    eventType: 'pixel-inview';
    once?: boolean;
  }
  export type { PlusPayflowSchema } from './plus-payflow';
  import type { PlusPayflowSchema } from './plus-payflow';
  export declare interface IExtendedPlusPayflowSchema {
    data: PlusPayflowSchema;
    eventType: 'plus-payflow';
    once?: boolean;
  }
  export type { RelateredeLinksSchema } from './rellink';
  import type { RelateredeLinksSchema } from './rellink';
  export declare interface IExtendedRelateredeLinksSchema {
    data: RelateredeLinksSchema;
    eventType: 'rellink';
    once?: boolean;
  }
  export type { ScrollSchema } from './scroll';
  import type { ScrollSchema } from './scroll';
  export declare interface IExtendedScrollSchema {
    data: ScrollSchema;
    eventType: 'scroll';
    once?: boolean;
  }
  export type { SpaceManagementSchema } from './spacemanagement';
  import type { SpaceManagementSchema } from './spacemanagement';
  export declare interface IExtendedSpaceManagementSchema {
    data: SpaceManagementSchema;
    eventType: 'spacemanagement';
    once?: boolean;
  }
  export type { TopmenuSchema } from './topmenu';
  import type { TopmenuSchema } from './topmenu';
  export declare interface IExtendedTopmenuSchema {
    data: TopmenuSchema;
    eventType: 'topmenu';
    once?: boolean;
  }
  export type { VideoSchema } from './video';
  import type { VideoSchema } from './video';
  export declare interface IExtendedVideoSchema {
    data: VideoSchema;
    eventType: 'video';
    once?: boolean;
  }
  
  export type TLongboatEvent = IExtendedArtikelInviewSchema|IExtendedContentInviewSchema|IExtendedDrEditionClickSchema|IExtendedEventSchema|IExtendedExternalLinksSchema|IExtendedGalleryClickSchema|IExtendedListeClicksSchema|IExtendedMitEbSchema|IExtendedPageviewSchema|IExtendedPixelInviewSchema|IExtendedPlusPayflowSchema|IExtendedRelateredeLinksSchema|IExtendedScrollSchema|IExtendedSpaceManagementSchema|IExtendedTopmenuSchema|IExtendedVideoSchema;

  export declare interface IAllLongboatProps
  extends Partial<ArtikelInviewSchema>,Partial<ContentInviewSchema>,Partial<DrEditionClickSchema>,Partial<EventSchema>,Partial<ExternalLinksSchema>,Partial<GalleryClickSchema>,Partial<ListeClicksSchema>,Partial<MitEbSchema>,Partial<PageviewSchema>,Partial<PixelInviewSchema>,Partial<PlusPayflowSchema>,Partial<RelateredeLinksSchema>,Partial<ScrollSchema>,Partial<SpaceManagementSchema>,Partial<TopmenuSchema>,Partial<VideoSchema> {}
  