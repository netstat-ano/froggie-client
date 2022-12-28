import ResponseApi from "./ResponseApi";

class Cart {
    token: string;
    constructor(token: string) {
        this.token = token;
    }
    async delete() {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/cart/delete-cart`,
            {
                method: "POST",
                body: JSON.stringify({}),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`,
                },
            }
        );
        const resJson = await response.json();

        return resJson as ResponseApi;
    }
}
export default Cart;
