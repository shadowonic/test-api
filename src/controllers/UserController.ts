import {
    JsonController, Param, Body, HttpCode,
    Get, Post, Put, Delete, HttpError
} from "routing-controllers";

import { authService } from '../sevices'
import { IUser,  IUserParams } from '../interfaces';
import { User } from '../models/connections'


@JsonController()
export class UserController {

    @Get("/")
    @HttpCode(200)
     some(){
        
        return 'test response'
    }
    @Get("/users")
    async getAll() {
        const users = (await User.find()).map(user => user.toJSON());
        return users
    }
    @Get("/users/:id")
    async getOne(@Param("id") id: string) {
        const result = await User.findById(id)
        const user = result && result.toJSON()
        if (!user) {
            throw new HttpError(404, `User was not found.`);
        }
        return user
    }
    @Post("/users")
    @HttpCode(201)
    async  post(@Body() { password, ...user }: IUserParams) {
        if ((await User.find({ email: user.email })).length) {
            throw new HttpError(405, `User already exist`);
        }
        new User({
            hash: authService.getHash(password),
            ...user
        }).save()
        return 'created'
    }

    @Put("/users/:id")
    async put(@Param("id") id: string, @Body() user: IUser) {
        await User.findByIdAndUpdate(id, user);
        return 'user edited'
    }

    @Delete("/users/:id")
    async remove(@Param("id") id: string) {
        await User.findByIdAndRemove(id);
        return 'user deleted'
    }
}
