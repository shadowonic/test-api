import {IUser} from './User'

export type UserParams = IUser & {
    password: String,
    roles: Array<string>
}

