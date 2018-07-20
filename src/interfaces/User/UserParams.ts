import {IUser} from './User'
import { MinLength } from 'class-validator';
import { Validator, validate, IsEmail, IsBoolean, IsEmailOptions } from 'class-validator';

export type UserParams = IUser & {
    password: String
}

