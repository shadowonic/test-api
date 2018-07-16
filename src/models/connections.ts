import { connection } from '../db';
import { IUserModel } from '../interfaces';
import { userSchema } from '../schemas/index'

export const User = connection.model<IUserModel>('User', userSchema);