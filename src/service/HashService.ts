import bcrypt from 'bcrypt';
import {saltRounds} from "../config/Config";
import Logger from "../util/Logger";

export default class HashService {
    public hashString(input: string): Promise<string> {
        return bcrypt.hash(input, saltRounds)
    }

    public compareStringWithHash(input: string, hash: string): Promise<boolean> {
        try {
            return bcrypt.compare(input, hash);
        }
        catch (e:any) {
            return new Promise(function (resolve, reject) {
                resolve(false);
            });
        }
    }
}