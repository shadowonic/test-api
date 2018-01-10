import * as mongoose from 'mongoose';

import { DB_HOST, DB_NAME, DB_PORT } from './config';
import { userSchema } from './schemas';
import { IUserModel, IUser } from './interfaces';

const MONGODB_CONNECTION: string = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);

// create models
const User = connection.model<IUserModel>('User', userSchema);
const user: IUser = {
  email: 'foo@bar.com',
  firstName: 'Brian',
  lastName: 'Love'
};
// new User(user).save().then(result => {
//   console.error(result);
// });
User.find({}).then(result => {
    console.error(result);
})