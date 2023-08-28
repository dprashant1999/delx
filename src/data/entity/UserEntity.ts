import {Schema, model} from 'mongoose';

interface UserEntity extends Document {
    email: string,
    userName: string,
    contactNumber: string,
    password: string
}

const userSchema = new Schema<UserEntity>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default model<UserEntity>("user", userSchema);