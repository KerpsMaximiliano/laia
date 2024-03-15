// ! ------------------------------ QUERIES ------------------------------

// * USER CHECK.
export const QUERY_USER_CHECK: string = `CUserE($user: Int!, $email: String!){cUserE(userId: $user, email: $email)}`;

// * USER LOGIN.
export const QUERY_USER_LOGIN: string = `LUser($user: Int!, $email: String!, $password: String!){lUser(userId: $user, email: $email, password: $password){name phone image first operationStatus}}`;

// ! ------------------------------ MUTATIONS ------------------------------

// * USER INFO.
export const MUTATION_USER_INFO: string = `UUser($user: Int!, $name: String, $surname: String, $phone: String, $password: String){uUser(userId: $user, lastName: $surname, name: $name, phone: $phone, password: $password)}`;
