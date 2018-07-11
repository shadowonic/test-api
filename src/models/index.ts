import { Model } from "mongoose";
import { IUserModel } from '../interfaces/';

export interface IModel {
  user: Model<IUserModel>;
}