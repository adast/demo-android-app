import mongoose from 'mongoose';
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
        required: [true, "Email cannot be blank"],
        validate: [ validator.isEmail, '{VALUE} is not a valid email' ],
        trim: true,
        index: true
    }
}, {timestamps: true});

export default mongoose.model<UserDocument>('User', UserSchema);