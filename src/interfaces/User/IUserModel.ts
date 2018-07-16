import { Document } from 'mongoose';
import {IUser} from './IUser'

export type IUserModel = Document  & IUser & {
    hash: string
};
