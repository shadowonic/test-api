import { UserModel } from '../interfaces';
import { userSchema } from '../schemas'
import * as mongoose from 'mongoose'

export const User = mongoose.model<UserModel>('User', userSchema);

