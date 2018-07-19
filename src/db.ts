import * as mongoose from 'mongoose';

export let connection: mongoose.Connection;
export const connect = (url) => {
 connection =  mongoose.createConnection(url)
};
