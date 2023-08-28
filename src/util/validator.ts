import Joi, {ValidationErrorItem, ValidationResult} from '@hapi/joi';
import {NextFunction, Request, Response} from 'express';
import Logger from './Logger';
import {RequestValidationError} from '../errors/ApiError';
import {ValidationSource} from "./enum/ValidationSourceEnum";

export default (schema: Joi.ObjectSchema, source: ValidationSource = ValidationSource.BODY) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        Logger.debug("Trying to validate: " + JSON.stringify(req[source]));
        const validationResult: ValidationResult = schema.validate(req[source], {abortEarly: false});
        Logger.debug("Schema validated for: " + source);

        if (!validationResult.error) return next();

        Logger.debug("Errors: " + JSON.stringify(validationResult))

        const details: ValidationErrorItem[] = validationResult.error.details;

        next(new RequestValidationError(details));
    } catch (error: any) {
        next(error);
    }
};
