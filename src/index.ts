import { startServer } from './server';
import { API_PORT, DB_HOST, DB_NAME, DB_PORT } from './config';

startServer(API_PORT, `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);

