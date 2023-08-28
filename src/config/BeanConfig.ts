import {container, singleton} from "tsyringe";
import ServerTestController from "../routes/v1/server_test/TestServer";
import UserController from "../routes/v1/user/UserController";

@singleton()
export default class BeanConfig {
    //Controllers
    private readonly _serverTestController: ServerTestController;
    private readonly _userController: UserController;


    constructor() {
        this._serverTestController = container.resolve(ServerTestController);
        this._userController = container.resolve(UserController);
    }

    get serverTestController(): ServerTestController {
        return this._serverTestController;
    }

    get userController(): UserController {
        return this._userController;
    }
}