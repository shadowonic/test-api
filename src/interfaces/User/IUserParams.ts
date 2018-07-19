import {IUser} from './IUser'
import {} from 'routing-controllers'
import { validate, IsEmail } from 'class-validator';
export type IUserParams = IUser & {
    password: String;
}
