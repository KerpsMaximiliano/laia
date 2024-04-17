// ! gCollectionConfiguration()
export const QUERY_COLLECTION_MENU: string = `GCollectionConfiguration($user: Int!, $library: Int!, $collection: Int!, $detail: Boolean!){gCollectionConfiguration(userId: $user, libraryId: $library, collectionId: $collection){title @include(if: $detail) conf ascDsc order operation filter{id alias}}}`;

// ! dCollection()
export const QUERY_COLLECTION_DELETE: string = `DCollection($collection: Int!){dCollection(collectionId: $collection)}`;

// ! gCollectionMiniature()
export const QUERY_COLLECTION_MINIATURES: string = `GCollectionMiniature($user: Int!, $library: Int!, $collection: Int!, $detail: Boolean!){gCollectionMiniature(userId: $user, libraryId: $library, collectionId: $collection){title @include(if: $detail) operation collectionMiniature{id miniatureProps miniatureHeader miniatureTitle miniatureSubtitle}}}`;

// ! gCollectionOrder()
export const QUERY_COLLECTION_ORDER: string = ``;
