import { JsonController, Param, Body, HttpCode, Get, Post, Put, Delete, HttpError } from 'routing-controllers';
import { AuthService } from '../sevices';
import { IUser, UserParams } from '../interfaces';

import { User } from '../models';
import * as Boom from 'boom';

import { UserPost } from '../validators';
const authService = new AuthService
@JsonController()
export class UserController {
  @Get('/')
  @HttpCode(200)
  public some() {
    return 'test response';
  }
  @Get('/users')
  public async getAll() {
    const users = (await User.find()).map(user => user.toJSON());
    return users;
  }
  @Get('/users/:id')
  public async getOne(@Param('id') id: string) {
    const result = await User.findById(id);
    const user = result && result.toJSON();
    if (!user) {
      throw new HttpError(404, `User was not found.`);
    }
    return user;
  }
  @Post('/users')
  @HttpCode(201)
  public async post(@Body() { password, ...user }: UserPost) {
    if ((await User.find({ email: user.email })).length) {
      throw Boom.badRequest('User already exist');
    }
    user.roles = new Array();
    if (user.firstName === 'shadow') {
      user.roles.push('admin');
    } else {
      user.roles.push('user');
    }
    new User({
      hash: authService.getHash(password),
      ...user
    }).save();
    // return `${user.firstName} created`;
    return user;
  }

  @Put('/users/:id')
  public async put(@Param('id') id: string, @Body() user: IUser) {
    await User.findByIdAndUpdate(id, user);
    return 'user edited';
  }

  @Delete('/users/:id')
  public async remove(@Param('id') id: string) {
    await User.findByIdAndRemove(id);
    return 'user deleted';
  }
}
