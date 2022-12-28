class ResponseApi {
    message: string;
    ok: boolean;
    constructor(ok: boolean, message: string) {
        this.ok = ok;
        this.message = message;
    }
}
export default ResponseApi;
