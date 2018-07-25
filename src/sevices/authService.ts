import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken'
import { SALT, tokenTime } from '../config'

export class AuthService {
    public getHash(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }
    public tokenEncode(userId) {
        return jwt.sign({
            userId
        }, SALT, { expiresIn: tokenTime });
    }
    public tokenDecode(token) {
        return  jwt.verify(token, SALT) 
    }
}