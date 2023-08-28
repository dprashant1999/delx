import validator from "../util/validator";
import {ProtectedRequest} from "../util/app-request";
import {NextFunction, Response} from "express";
import Logger from "../util/Logger";
import {BadTokenError} from "../errors/ApiError";
import {openEndpoints} from "../config/Config";
import schema from "./validation/Schema";
import {ValidationSource} from "../util/enum/ValidationSourceEnum";
import JWT from "../config/JWT";
import SessionPayload from "../util/other/SessionPayload";
import {autoInjectable} from "tsyringe";
import URLUtils from "../util/URLUtils";

@autoInjectable()
export default class AuthMiddleware {

    authMiddleware = [
        //Validate if Auth token is provided
        async (req: ProtectedRequest, res: Response, next: NextFunction) => {
            Logger.debug("Validating for auth token: " + req.url);
            if (!openEndpoints.includes(req.url)) {
                validator(schema.authToken, ValidationSource.HEADER)(req, res, next);
            } else {
                next();
            }
        },

        //Validate auth token and save payload in request
        async (req: ProtectedRequest, res: Response, next: NextFunction) => {
            Logger.debug("Validating Session token");
            try {
                if (URLUtils.isProtectedURL(req)) {
                    await JWT.validateSessionToken(req.header("auth-token") as string);
                    let sessionPayload: SessionPayload = await JWT.decodeSessionToken(req.header("auth-token")!);
                    req.accessToken = req.header("auth-token")!;
                    req.sessionPayload = sessionPayload;
                    Logger.debug(sessionPayload);
                }
                next();
            }catch(e) {
                next(new BadTokenError());
            }
        }
    ];

}
