// ! uLibraryRename()
export const MUTATION_LIBRARY_RENAME: string = `ULibraryRename($library: Int!, $user: Int!, $title: String!){uLibraryRename(libraryId: $library, userId: $user, title: $title)}`;

// ! uLibraryMiniatures()
export const MUTATION_LIBRARY_MINIATURES: string = `ULibraryMiniatures($library: Int!, $header: String!, $title: String!, $subtitle: String!){uLibraryMiniatures(libraryId: $library miniatureHeader: $header miniatureTitle: $title miniatureSubtitle: $subtitle)}`;
