import * as mongoose from 'mongoose'
import { UsersSchema, IUser } from '../models/users'
import * as md5 from 'md5'

const Users = mongoose.model('Users', UsersSchema)

export class UsersController {

    public async addNewUser(data: IUser) {
        let newUser = new Users({
            email: data.email,
            password: md5(data.password),
            email_confirmed: false
        })
        await newUser.save()
        return newUser
    }

    public async getUsers(data: any) {           
        return await Users.find(data)
    }

    public async getUserWithID(userId: string) {           
        return await Users.findById(userId)
    }

    public async updateUser(userId: string, data: any) {           
        return await Users.findOneAndUpdate({ _id: userId }, data, { new: true })
    }

    public async deleteUser(userId: string) {           
        return await Users.remove({ _id: userId })
    }
    
}