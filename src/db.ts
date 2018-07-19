import * as mongoose from 'mongoose';

import { DB_HOST, DB_NAME, DB_PORT, DB_TEST_PORT, DB_TEST_HOST, DB_TEST_NAME } from './config';
// export let adress = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
// export class dbService {
//     static getConnection(adress) {
//         if (adress == undefined) {
//             adress = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
//         }
//         let MONGODB_CONNECTION: string
//         MONGODB_CONNECTION = adress
//         let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);     
//         return connection
//     }
// }

// mongodb://pro-net-api-db:27000/pro-net
// mongodb://pro-net-api-db:27017/pro-net
let MONGODB_CONNECTION: string
if (!!(process.env.JEST_WORKER_ID)) {

    MONGODB_CONNECTION = `mongodb://${DB_TEST_HOST}:${DB_TEST_PORT}/${DB_TEST_NAME}`;
} else {
    MONGODB_CONNECTION = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}


export const testing = MONGODB_CONNECTION
export const connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);



// create models
// const User = connection.model<IUserModel>('User', userSchema);
// const user: IUser = {
//   email: 'foo@bar.com',
//   firstName: 'Brianer',
//   lastName: 'Loverer'
// };
// new User(user).save().then(result => {
//   console.error(result);
// });
// User.find().then(result => {
//     console.error(result);
// })