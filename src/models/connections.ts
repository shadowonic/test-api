import { connection } from '../db';
import { IUserModel } from '../interfaces';
import { userSchema } from '../schemas'

export const User = connection.model<IUserModel>('User', userSchema);

