import 'reflect-metadata';
import express, {Router} from 'express';
import {autoInjectable,} from 'tsyringe';
import BeanConfig from "../../config/BeanConfig";


@autoInjectable()
export default class RouterConfig {
    private router: Router;
    private beanConfig: BeanConfig;
    private isConfigured: boolean;

    constructor(beanConfig: BeanConfig) {
        this.router = express.Router();
        this.beanConfig = beanConfig;
        this.isConfigured = false;
    }

    private configureTestRoutes() {
        this.router.use('/test', this.beanConfig.serverTestController.routes());
    }
    private configureUserRoutes() {
        this.router.use('/user', this.beanConfig.userController.routes());
    }

    public getRouter(): Router {
        if(this.isConfigured) {
            return this.router;
        }

        this.configureTestRoutes();
        this.configureUserRoutes();
        this.isConfigured = true;
        return this.router;
    }
}