// ! ------------------------------ QUERIES ------------------------------

// ! ------------------------------ MUTATIONS ------------------------------
// * LIBRARY RENAME.
export const MUTATION_LIBRARY_RENAME: string = `UAdminSellLibraryRename($library: Int!, $user: Int!, $title: String!){uAdminSellLibraryRename(libraryId: $library, title: $title, user: $user)}`;
