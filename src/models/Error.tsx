class Error {
    message: string;
    ok: boolean;
    constructor(message: string, ok: boolean) {
        this.message = message;
        this.ok = ok;
    }
}
export default Error;
