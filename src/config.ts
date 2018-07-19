// const { SALT, API_PORT,DB_CONNECTION, NODE_ENV, API_TEST_PORT, DB_HOST = '1000', DB_TEST_HOST, DB_PORT, DB_TEST_PORT, DB_NAME, DB_TEST_NAME, MODE } = process.env;
const { SALT, API_PORT, DB_HOST, DB_PORT, DB_NAME } = process.env
const DB_TEST_PORT = 27000;
const DB_TEST_HOST = 'localhost'
const API_TEST_PORT = 3002
const DB_TEST_NAME = 'pro-net'
export {
    SALT, API_PORT, DB_HOST, DB_PORT, DB_NAME,
    DB_TEST_PORT, DB_TEST_HOST, API_TEST_PORT, DB_TEST_NAME
};
export const tokenTime = '1h'

// DB_HOST=pro-net-api-db
// DB_PORT=27017
// DB_NAME=pro-net