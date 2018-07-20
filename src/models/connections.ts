import { UserModel } from '../interfaces';
import { userSchema } from '../schemas'
import {connection} from '../server'

export const User = connection.model<UserModel>('User', userSchema);
