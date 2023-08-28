// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const jwtKey = process.env.JWT_KEY;
export const openEndpoints: string[] = process.env.OPEN_ENDPOINTS!.split(",");

export const saltRounds: number  = Number(process.env.SALT_ROUNDS || "10");

export const db = {
    name: process.env.DB_NAME || '',
    host: process.env.DB_HOST || '',
    port: process.env.DB_PORT || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_USER_PWD || '',
    // connectionString: 'mongodb://' + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME
    connectionString: "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_USER_PWD + "@cluster0.5uony.mongodb.net/" + process.env.DB_NAME + "?retryWrites=true&w=majority"
};

export const prodDb = {
    name: process.env.PROD_DB_NAME || '',
    host: process.env.PROD_DB_HOST || '',
    port: process.env.PROD_DB_PORT || '',
    user: process.env.PROD_DB_USER || '',
    password: process.env.PROD_DB_USER_PWD || '',
};

export const corsUrl = process.env.CORS_URL;

export const tokenInfo = {
    accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '0'),
    refreshTokenValidityDays: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '0'),
    issuer: process.env.TOKEN_ISSUER || '',
    audience: process.env.TOKEN_AUDIENCE || '',
};

export const logDirectory = process.env.LOG_DIR;
