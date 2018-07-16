import { JsonController, Post, Body, HttpCode, HttpError } from 'routing-controllers';
import { User } from '../models/connections'
import { IUserParams } from '../interfaces'
import { authService } from '../sevices';


@JsonController()
export class AuthController {
    private authServise: authService
    constructor() {
        this.authServise = new authService()
    }

    @Post("/login")
    @HttpCode(200)
    async  post(@Body() { email, password }: IUserParams) {
        const user = await User.findOne({ email })
        if (user) {
            if (this.authServise.getHash(password) !== user.hash) {
                throw new HttpError(406, 'Wrong password')
            }
            return { token: this.authServise.tokenEncode(user._id) }
        } else {
            throw new HttpError(406, `No such user`);
        }
    }
}
