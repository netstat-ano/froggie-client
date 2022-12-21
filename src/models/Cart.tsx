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
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`,
                },
            }
        );
        const resJson = await response.json();
        if (resJson.ok) {
            return resJson.message;
        } else {
            return resJson.message as Error;
        }
    }
}
export default Cart;
