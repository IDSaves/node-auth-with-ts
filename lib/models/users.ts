import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface IUser extends mongoose.Document {
	email: string
	email_confirmed: boolean
	password: string
    nickname?: string
    created_date: Date
}

export const UsersSchema = new Schema({
    email: {
        type: String            
    },
    email_confirmed: {
        type: Boolean,
        default: false
    },
    password: {
        type: String
    },
    nickname: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})