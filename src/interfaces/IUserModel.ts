import {Document} from 'mongoose';
import {IUser} from '.';

export type IUserModel = IUser & Document;
