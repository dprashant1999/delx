export default class ResponseMessages {
    public static get TEST_SERVER_SUCCESS():string {return "Your server is running fine"}

    public static get AUTH_TOKEN_MANDATORY(): string {return "auth-token is required"}
    public static get REGISTER_USER_SUCCESS(): string {return "User registered successfully"}
    public static get LOGIN_SUCCESS(): string {return "Logged in successfully"}

    public static get EMAIL_REQUIRED(): string {return "Email address is required"}
    public static get EMAIL_STRING(): string {return "Email must be string"}
    public static get EMAIL_ID_INCORRECT(): string {return "Email ID incorrect"}

    public static get USER_NAME_REQUIRED(): string {return "User name is required"}
    public static get USER_NAME_STRING(): string {return "User name must be string"}

    public static get CONTACT_NUMBER_REQUIRED(): string {return "Contact Number is required"}
    public static get CONTACT_NUMBER_STRING(): string {return "Contact Number must be string"}

    public static get PASSWORD_REQUIRED(): string {return "Password is required"}
    public static get PASSWORD_STRING(): string {return "Password must be string"}
    public static get PASSWORD_PATTERN(): string {return "Password must be one upper, lower, number, special and minimum 8 character."}
}

