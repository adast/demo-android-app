import mongoose from 'mongoose';
import {MongoError} from 'mongodb';
import * as validator from 'validator';

export type UserDocument = mongoose.Document & {
    first_name: string;
    last_name: string;
    email: string;
    avatar_url: string;
};

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        lowercase: true,
        required: [true, "First name cannot be blank"],
        trim: true,
        index: true
    },
    last_name: {
        type: String,
        lowercase: true,
        required: [true, "Last name cannot be blank"],
        trim: true,
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        validate: [ validator.isEmail, 'Email is not valid' ],
        trim: true,
        index: true
    }
}, {timestamps: true});

UserSchema.post('save', (error: MongoError, doc: any, next: any) => {
    if (error.code === 11000) {
        next("User with this email address already exists.");
    } else {
        next(error.message);
    }
});



export default mongoose.model<UserDocument>('User', UserSchema);