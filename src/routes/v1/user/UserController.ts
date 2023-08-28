import {autoInjectable} from "tsyringe";
import express, {Router} from "express";
import Logger from "../../../util/Logger";
import schema from "./validation/Schema";
import validator from "../../../util/validator";
import asyncHandler from "../../../util/asyncHandler";
import UserService from "../../../service/UserService";
import User from "../../../dto/User";
import {plainToClass, plainToInstance} from "class-transformer";
import {SuccessResponse} from "../../../util/ApiResponse";
import ResponseMessages from "../../../util/statics/ResponseMessages";
import {UnImplementedError} from "../../../errors/ApiError";

@autoInjectable()
export default class UserController {
    private _router: Router;
    private _userService: UserService;

    constructor(_userService: UserService) {
        Logger.debug("Initialising User Controller");
        this._router = express.Router();
        this._userService = _userService;
    }

    routes() {
        Logger.debug("Configuring routes for User");
        this._router.post("/register", validator(schema.registerUser), asyncHandler(async (req: any, res: any)=> this.registerUser(req, res)));
        this._router.post("/login", validator(schema.loginUser), asyncHandler(async (req: any, res: any)=> this.loginUser(req, res)));
        return this._router;
    }

    private async registerUser(req: any, res: any) {
        Logger.debug("Registering User");
        let user: User = plainToInstance(User, req.body, {excludeExtraneousValues: true});
        Logger.debug("Your user: " + JSON.stringify(user));
        user = await this._userService.registerUser(user);
        return new SuccessResponse(ResponseMessages.REGISTER_USER_SUCCESS, user).send(res);
    }

    private async loginUser(req:any, res: any) {
        Logger.debug("Logging in user");
        let user: User = plainToInstance(User, req.body, {excludeExtraneousValues: true});
        let token: string = await this._userService.loginUser(user);
        res.cookie("secureCookie", JSON.stringify(token), {
            secure: process.env.NODE_ENV !== "development",
            httpOnly: true,
        });
        return new SuccessResponse(ResponseMessages.LOGIN_SUCCESS, {token: token}).send(res);
    }
}