import { Model } from 'mongoose';
import { IUserModel } from '.';

export interface IModel {
  user: Model<IUserModel>;
}
