export default class SessionPayload {
    private _userId: string;

    constructor(userId: string) {
        this._userId = userId;
    }

    get userId(): string {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }
}
