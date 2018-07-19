import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken'
import { SALT, tokenTime } from '../config'

export class authService {
    static getHash(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }
    static tokenEncode(userId) {
        return jwt.sign({
            userId
        }, SALT, { expiresIn: tokenTime });
    }
    static tokenDecode(token) {
        return  jwt.verify(token, SALT) 
    }
}