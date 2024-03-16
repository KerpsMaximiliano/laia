// * QUERIES.
export const QUERY_ADMIN_SELL_ARTICLES: string = `Products($page: Int!, $merchant: Int!){products(page: $page, merchantId: $merchant) {id title price stock frontPage typeOfSale typeOfPrice}}`;
