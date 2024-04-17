// ! gLibraryConfiguration()
export const QUERY_LIBRARY_MENU: string = `GLibraryConf($library: Int!, $user: Int!, $detail: Boolean!){gLibraryConf(libraryId: $library, userId: $user){title @include(if: $detail) conf operation}}`;

// ! gLibraryMiniatures()
export const QUERY_LIBRARY_MINIATURES: string = `GLibraryMiniatures($user: Int!, $library: Int!, $detail: Boolean!){gLibraryMiniatures(libraryId: $library, userId: $user){title @include(if: $detail) miniatureProps miniatureHeader miniatureTitle miniatureSubtitle operation}}`;
