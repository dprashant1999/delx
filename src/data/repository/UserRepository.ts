import {autoInjectable} from "tsyringe";
import User from "../../dto/User";
import {NotFoundError, UnImplementedError} from "../../errors/ApiError";
import UserEntity from "../entity/UserEntity";
import AppUtils from "../../util/AppUtils";
import {instanceToPlain, plainToInstance} from "class-transformer";
import Logger from "../../util/Logger";

@autoInjectable()
export default class UserRepository {
    public async registerUser(user: User): Promise<User> {
        const userEntity = new UserEntity(AppUtils.nullPropsRemover(instanceToPlain(user)));
        await userEntity.save();
        return plainToInstance(User, userEntity,{excludeExtraneousValues: true});
    }

    public async fetchUserByEmail(email: string): Promise<User> {
        const userEntity = await UserEntity.findOne({email: email});

        if(!userEntity) {
            Logger.error("User entity not found by email: " + email);
            throw new NotFoundError("User with email address not found");
        }

        return plainToInstance(User, userEntity, {excludeExtraneousValues: true});
    }
}