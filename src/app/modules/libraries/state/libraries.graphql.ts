// ! ------------------------------ QUERIES ------------------------------

// * WATCH KEYWORDS.
export const WATCH_ADMIN_SELL_ARTICLE_KEYWORDS: string = `WAdminSellKeyWords($user: Int!, $keyword: String){wAdminSellKeyWords(userId: $user, keyWordValue: $keyword)}`;

// *
export const QUERY_ADMIN_SELL_ARTICLES: string = `Products($page: Int!, $merchant: Int!){products(page: $page, merchantId: $merchant) {id title price stock frontPage typeOfSale typeOfPrice}}`;

// ! ------------------------------ MUTATIONS ------------------------------

// * ASSIGN ARTICLE.
export const MUTATION_ADMIN_SELL_ASSOCIATION: string = `UAdminSellAssociation($user: Int!, $product: Int!){uAdminSellAssociation(productId: $product, userId: $user)}`;
