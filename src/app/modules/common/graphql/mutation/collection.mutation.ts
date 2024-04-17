// ! uCollectionRename()
export const MUTATION_COLLECTION_RENAME: string = `UCollectionRename($collection: Int!, $library: Int!, $title: String!){uCollectionRename(library: $library,collection: $collection, title: $title)}`;

// ! dCollection()
export const MUTATION_COLLECTION_DELETE: string = `DCollection($collection: Int!){dCollection(collectionId: $collection)}`;

// ! uCollectionMiniature()
export const MUTATION_COLLECTION_MINIATURES: string = `UCollectionMiniature($collection: Int!, $header: String!, $title: String!, $subtitle: String!){uCollectionMiniature(collectionId: $collection miniatureHeader: $header miniatureTitle: $title miniatureSubtitle: $subtitle)}`;

// ! uCollectionOrder()
export const MUTATION_COLLECTION_ORDER: string = ``;
