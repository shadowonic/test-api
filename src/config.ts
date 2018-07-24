// const { SALT, API_PORT,DB_CONNECTION, NODE_ENV, API_TEST_PORT, DB_HOST = '1000', DB_TEST_HOST, DB_PORT, DB_TEST_PORT, DB_NAME, DB_TEST_NAME, MODE } = process.env;
let { SALT, API_PORT, DB_HOST, DB_PORT, DB_NAME } = process.env;
// const SALT =  'test';
if (!SALT){
  SALT = 'test'
}
export {
  SALT,
  API_PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME

};
export const tokenTime = '1h';

