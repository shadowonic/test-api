import { JsonController, Post, Body, HttpCode, Get, Authorized } from 'routing-controllers';
import { User } from '../models/connections'
import { UserParams } from '../interfaces'
import { AuthService } from '../sevices';
import * as Boom from 'boom';
const authService = new AuthService
@JsonController()
export class AuthController {

    @Post('/login')
    @HttpCode(200)
   public async  post(@Body() { email, password }: UserParams) {
       
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
    public  async all() {
      const users = (await User.find()).map(user => user.toJSON());
      return users;
    }
    @Authorized('admin')
    @Get('/admin')
    public  async test() {
      const users = (await User.find()).map(user => user.toJSON());
      return users;
    }
}
