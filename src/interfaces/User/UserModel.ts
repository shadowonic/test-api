import { Document } from 'mongoose';
import {IUser} from './User'

export type UserModel = Document  & IUser & {
    hash: string,
    roles: any
};
