import Joi from "@hapi/joi";
import ValidationRegex from "../../../../util/statics/ValidationRegex";
import ResponseMessages from "../../../../util/statics/ResponseMessages";

export default {
    registerUser: Joi.object().keys({
        email: Joi.string().regex(ValidationRegex.EMAIL_REGEX).required().messages({
            "any.required": ResponseMessages.EMAIL_REQUIRED,
            "string.pattern.base": ResponseMessages.EMAIL_ID_INCORRECT,
            "string.base": ResponseMessages.EMAIL_STRING,
            "string.empty": ResponseMessages.EMAIL_REQUIRED
        }),
        userName: Joi.string().required().messages({
            "any.required": ResponseMessages.USER_NAME_REQUIRED,
            "string.base": ResponseMessages.USER_NAME_STRING,
            "string.empty": ResponseMessages.USER_NAME_REQUIRED
        }),
        contactNumber: Joi.string().regex(ValidationRegex.CONTACT_NO_REGEX).required().messages({
            "any.required": ResponseMessages.CONTACT_NUMBER_REQUIRED,
            "string.pattern.base": ResponseMessages.CONTACT_NUMBER_STRING,
            "string.empty": ResponseMessages.CONTACT_NUMBER_REQUIRED
        }),
        password: Joi.string().regex(ValidationRegex.PASSWORD_REGEX).required().messages({
            "any.required": ResponseMessages.PASSWORD_REQUIRED,
            "string.base": ResponseMessages.PASSWORD_STRING,
            "string.empty": ResponseMessages.PASSWORD_REQUIRED,
            "string.pattern.base": ResponseMessages.PASSWORD_PATTERN
        })
    }),
    loginUser: Joi.object().keys({
        email: Joi.string().regex(ValidationRegex.EMAIL_REGEX).required().messages({
            "any.required": ResponseMessages.EMAIL_REQUIRED,
            "string.pattern.base": ResponseMessages.EMAIL_ID_INCORRECT,
            "string.base": ResponseMessages.EMAIL_STRING,
            "string.empty": ResponseMessages.EMAIL_REQUIRED
        }),
        password: Joi.string().required().messages({
            "any.required": ResponseMessages.PASSWORD_REQUIRED
        })
    })
};
