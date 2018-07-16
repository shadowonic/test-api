import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken'
import { SALT, tokenTime } from '../config'

export class authService {
    getHash(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }
    tokenEncode(userId) {
        return jwt.sign({
            userId
        }, SALT, { expiresIn: tokenTime });
    }
    tokenDecode(token) {
        return  jwt.verify(token, SALT) 
    }
}