import express, {Express} from 'express';
import Logger from "./util/Logger";
import bodyParser from 'body-parser';
import cors from 'cors';
import {corsUrl, db} from "./config/Config";
import RouterConfig from './routes/v1';
import AppMiddlewares from "./config/ErrorHandlerMiddlewares";
import AuthMiddleware from "./auth/AuthMiddleware";
import {autoInjectable,} from "tsyringe"
import * as http from "http";
import mongoose from "mongoose";

@autoInjectable()
export default class AppWideConfig {

    private app: Express;
    private authMiddleware: AuthMiddleware;
    private isConfigured: boolean;
    private routerConfig: RouterConfig;

    constructor(authMiddleware: AuthMiddleware, routerConfig: RouterConfig) {
        this.app = express();
        this.authMiddleware = authMiddleware;
        this.isConfigured = false;
        this.routerConfig = routerConfig;
    }

    public getConfiguredApp(): http.Server {
        Logger.debug("Returning Configured app");
        process.on('uncaughtException', (e) => {
            Logger.error(e);
        });

        if (this.isConfigured) {
            return http.createServer(this.app);
        }

        this.configureBodyParser();
        this.configureCORS();
        this.configureMongoose();
        this.attachPreRouterMiddlewares();
        this.configureRouter();
        this.attachErrorMiddleware();

        let server: http.Server = new http.Server(this.app);

        this.isConfigured = true;
        return server;

        // return this.app;
    }

    private configureBodyParser() {
        Logger.debug("Configuring Body Parser");
        this.app.use(bodyParser.json({limit: '10mb'}));
        this.app.use(bodyParser.urlencoded({limit: '10mb', extended: true, parameterLimit: 50000}));
    }

    private configureCORS() {
        Logger.debug("Configuring CORS");
        this.app.use(cors({origin: corsUrl, optionsSuccessStatus: 200}));
    }

    private configureCookieParser() {
        Logger.debug("Configuring Cookie Parser");
        const cookieParser = require('cookie-parser');
        this.app.use(cookieParser());
    }

    private attachPreRouterMiddlewares() {
        Logger.debug("Configuring Pre Router Middlewares");
        this.app.use(this.authMiddleware.authMiddleware);
    }

    private configureRouter() {
        Logger.debug("Configuring Router");
        this.app.use('/v1', this.routerConfig.getRouter());
    }

    private attachErrorMiddleware() {
        Logger.debug("Configuring Error Middlewares");
        // catch 404 and forward to error handler
        this.app.use(AppMiddlewares.undefinedRoutesErrorMiddleware);

        // Middleware Error Handler
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.app.use(AppMiddlewares.errorHandlerMiddleware);
    }

    private configureMongoose() {
        Logger.debug("Configuring Mongoose");
        mongoose.connect(db.connectionString,
        () => {
            Logger.debug('Mongoose connected to database: ' + db.name)
        }
    )
    }
}