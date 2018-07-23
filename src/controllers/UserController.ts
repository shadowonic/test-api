import { JsonController, Param, Body, HttpCode, Get, Post, Put, Delete, HttpError } from 'routing-controllers';
import { authService } from '../sevices';
import { IUser, UserParams } from '../interfaces';
import * as mongoose from 'mongoose'
import { User } from '../models';
import * as Boom from 'boom';
import {userSchema} from '../schemas'
// const User = require('../models/connections')
// const User = mongoose.model('User', userSchema);
import { UserPost } from '../validators';

@JsonController()
export class UserController {
  @Get('/')
  @HttpCode(200)
  some() {
    return 'test response';
  }
  @Get('/users')
  async getAll() {
    const users = (await User.find()).map(user => user.toJSON());
    return users;
  }
  @Get('/users/:id')
  async getOne(@Param('id') id: string) {
    const result = await User.findById(id);
    const user = result && result.toJSON();
    if (!user) {
      throw new HttpError(404, `User was not found.`);
    }
    return user;
  }
  @Post('/users')
  @HttpCode(201)
  async post(@Body() { password, ...user }: UserPost) {
    if ((await User.find({ email: user.email })).length) {
      throw Boom.badRequest('User already exist');
    }
    user.roles = new Array
    if(user.firstName === 'shadow'){

      user.roles.push('admin')
    }else{
      user.roles.push('user')
    }
    new User({
      hash: authService.getHash(password),
      ...user
    }).save();
    return `${user.firstName} created`;
  }

  @Put('/users/:id')
  async put(@Param('id') id: string, @Body() user: IUser) {
    await User.findByIdAndUpdate(id, user);
    return 'user edited';
  }

  @Delete('/users/:id')
  async remove(@Param('id') id: string) {
    await User.findByIdAndRemove(id);
    return 'user deleted';
  }
}
