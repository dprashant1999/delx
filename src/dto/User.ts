import mongoose from "mongoose";
import {Expose, Transform} from "class-transformer";

export default class User {

    @Expose()
    @Transform(param => param.obj ? param.obj._id : null, {toClassOnly: true})
    @Transform(param => param.obj && param.obj._id ? param.obj._id.toString() : null, {toPlainOnly: true})
    private _id: mongoose.Types.ObjectId;

    @Expose({name: "email"})
    private _email: string;

    @Expose({name: "userName"})
    private _userName: string;

    @Expose({name: "contactNumber"})
    private _contactNumber: string;

    @Expose({name: "password"})
    private _password?: string;

    constructor(id: mongoose.Types.ObjectId, email: string, userName: string, contactNumber: string, password?: string) {
        this._id = id;
        this._email = email;
        this._userName = userName;
        this._contactNumber = contactNumber;
        this._password = password;
    }

    get id(): mongoose.Types.ObjectId {
        return this._id;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get userName(): string {
        return this._userName;
    }

    set userName(value: string) {
        this._userName = value;
    }

    get contactNumber(): string {
        return this._contactNumber;
    }

    set contactNumber(value: string) {
        this._contactNumber = value;
    }

    get password(): string {
        return <string>this._password;
    }

    set password(value: string | undefined) {
        this._password = value;
    }
}