import { JsonController, Post, Body, HttpCode, HttpError, Get } from 'routing-controllers';
import { User } from '../models/connections'
import { IUserParams } from '../interfaces'
import { authService } from '../sevices';


@JsonController()
export class AuthController {

    @Post("/login")
    @HttpCode(200)
    async  post(@Body() { email, password }: IUserParams) {
        const user = await User.findOne({ email })
        if (user) {
            if (authService.getHash(password) !== user.hash) {
                throw new HttpError(406, 'Wrong password')
            }
            return { token: authService.tokenEncode(user._id) }
        } else {
            throw new HttpError(406, `No such user`);
        }
    }
}
