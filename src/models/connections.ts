import { IUserModel } from '../interfaces';
import { userSchema } from '../schemas'
import {connection} from '../server'

export const User = connection.model<IUserModel>('User', userSchema);
