import {IUser} from './User'

export type UserParams = IUser & {
    password: string,
    roles: [string]
}

