import { JsonController, Post, Body, HttpCode, HttpError, Get, Authorized } from 'routing-controllers';
import { User } from '../models/connections'
import { UserParams } from '../interfaces'
import { authService } from '../sevices';
import * as Boom from 'boom';

@JsonController()
export class AuthController {

    @Post("/login")
    @HttpCode(200)
    async  post(@Body() { email, password }: UserParams) {
       
        const user = await User.findOne({ email })
        if (user) {
            if (authService.getHash(password) !== user.hash) {
                throw Boom.badRequest('wrong password');
            }
            return { token: authService.tokenEncode(user._id) }
        } else {
            throw Boom.badRequest('no such user');
        }
    }
    @Authorized()
    @Get('/test')
    async all() {
      const users = (await User.find()).map(user => user.toJSON());
      return users;
    }
    @Authorized('admin')
    @Get('/admin')
    async test() {
      const users = (await User.find()).map(user => user.toJSON());
      return users;
    }
}
