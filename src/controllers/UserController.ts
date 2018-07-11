import { Controller, JsonController, Param, Body, Get, Post, Put, Delete, Req, Res, HttpCode, OnUndefined, HttpError } from "routing-controllers";
import { SpawnSyncReturns } from "child_process";

import { connection } from '../db';
import { userSchema } from '../schemas'
import { IUserModel } from '../interfaces/IUserModel'
    ;
import { isNull } from "util";
const User = connection.model<IUserModel>('User', userSchema);

@JsonController()
export class UserController {

    @Get("/users")
    async getAll() {
        const users = (await User.find()).map(user => user.toJSON());
        console.log(users);

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
    async  post(@Body() user: IUserModel) {
        let result = (await User.find(user.email)).map(user => user.email)
        let mayCreate = true
        await result.forEach(item => {
            if (item == user.email) {
                mayCreate = false
            }
        })
        if (!mayCreate) {
            throw new HttpError(405, `User already exist`);
        }
        else 
       new User(user).save()
        return 'created'
    }

    @Put("/users/:id")
    async put(@Param("id") id: string, @Body() user: IUserModel) {
        await User.findByIdAndUpdate(id, user);
        return 'success'
    }

    @Delete("/users/:id")
    async remove(@Param("id") id: string) {
        await User.findByIdAndRemove(id);
        return 'user deleted'
    }


}
