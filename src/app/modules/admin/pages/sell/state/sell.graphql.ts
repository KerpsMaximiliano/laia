// ! ------------------------------ QUERIES ------------------------------

// * WATCH KEYWORDS.
export const WATCH_ADMIN_SELL_ARTICLE_KEYWORDS: string = `WAdminSellKeyWords($user: Int!, $keyword: String){wAdminSellKeyWords(userId: $user, keyWordValue: $keyword){id word}}`;

// *
export const QUERY_ADMIN_SELL_ARTICLES: string = `Products($page: Int!, $merchant: Int!){products(page: $page, merchantId: $merchant) {id title price stock frontPage typeOfSale typeOfPrice}}`;

// ! ------------------------------ MUTATIONS ------------------------------
