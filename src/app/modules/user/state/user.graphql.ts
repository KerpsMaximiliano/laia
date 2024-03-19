// ! ------------------------------ QUERIES ------------------------------

// * SQQ CHECK.
export const QUERY_SQQ_CHECK: string = `SqqCheck($email: String!){sqqCheck(email: $email){status userId userName userLastName}}`;

// * SQQ LOGIN.
export const QUERY_SQQ_LOGIN: string = `SqqLogin($user: Int!, $password: String!){sqqLogin(userId: $user, password: $password){phone image status}}`;

// * GOOGLE AUTH.
export const QUERY_GOOGLE_AUTH: string = `SqqGoogle($email: String!){sqqGoogle(email: $email){id first}}`;

// ! ------------------------------ MUTATIONS ------------------------------

// * USER INFO.
export const MUTATION_USER_INFO: string = `UUser($user: Int!, $password: String, $phone: String, $name: String, $surname: String){uUser(userId: $user, password: $password, phone: $phone, name: $name, lastName: $surname)}`;
