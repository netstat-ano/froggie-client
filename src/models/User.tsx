class User {
    email: string;
    username?: string;
    password: string;
    retypePassword?: string;
    constructor(
        email: string,
        username: string | undefined,
        password: string,
        retypePassword: string | undefined
    ) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.retypePassword = retypePassword;
    }
    async login() {
        const response = await fetch("http://localhost:8080/auth/login-user", {
            method: "POST",
            body: JSON.stringify({
                email: this.email,
                password: this.password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const userData = await response.json();
            localStorage.setItem("token", userData.token);
            const expiredTime = new Date(Date.now() + 1 * (60 * 60 * 1000));

            localStorage.setItem("expiresIn", String(expiredTime));
            localStorage.setItem("userId", String(userData.userId));

            return { userData, ok: true };
        }
        const responseMessage = await response.json();
        return { message: responseMessage.message, ok: false };
    }
    async create() {
        if (this.username && this.retypePassword) {
            const response = await fetch(
                "http://localhost:8080/auth/create-user",
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: this.email,
                        username: this.username,
                        password: this.password,
                        retypePassword: this.retypePassword,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response;
        }
    }
}
export default User;
