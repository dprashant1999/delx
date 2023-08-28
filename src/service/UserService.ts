import {autoInjectable} from "tsyringe";
import User from "../dto/User";
import UserRepository from "../data/repository/UserRepository";
import HashService from "./HashService";
import Logger from "../util/Logger";
import JWTUtil from "../util/JWTUtil";
import SessionPayload from "../util/other/SessionPayload";
import {BadRequestError, ConflictError, InternalError, NotFoundError} from "../errors/ApiError";
import {cache} from "@hapi/joi";

@autoInjectable()
export default class UserService {
    private _userRepository:UserRepository;
    private _hashService: HashService;

    constructor(userRepository: UserRepository, hashService: HashService) {
        this._userRepository = userRepository;
        this._hashService = hashService;
    }

    public async registerUser(user: User): Promise<User> {
        try {
            user.password = await this._hashService.hashString(user.password);
            user = await this._userRepository.registerUser(user);
            user.password = undefined;
            return user;
        }
        catch (e: any) {
            Logger.error("Error while registering user");
            throw new ConflictError("User with email id already exists");
        }
    }

    public async loginUser(user: User): Promise<string> {
        try {
            let userFromDb: User = await this._userRepository.fetchUserByEmail(user.email);
            if (await this._hashService.compareStringWithHash(user.password, userFromDb.password)) {
                return JWTUtil.generateJWTSessionToken(new SessionPayload(userFromDb.id.toString()));
            }
        }
        catch (e: any) {
            if (e instanceof NotFoundError) {
                throw new NotFoundError("User with email address is not registered");
            }
            throw new InternalError("Internal server error");
        }
        throw new BadRequestError("Invalid user name or password");
    }
}