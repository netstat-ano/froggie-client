import CartItem from "./CartItem";
import OrderItem from "./OrderItem";
class Order {
    items: CartItem[];
    constructor(items: CartItem[]) {
        this.items = items;
    }
    async save(token: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/order/add-order`,
            {
                method: "POST",
                body: JSON.stringify({
                    cartItems: this.items,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const resJson = await response.json();
        if (resJson.ok) {
            return resJson.cart as CartItem[];
        } else {
            return resJson.message as Error;
        }
    }
    static async fetchOrdersByUser(token: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/order/fetch-orders-by-user`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const resJson = await response.json();
        if (resJson.ok) {
            return resJson.orders as OrderItem[];
        } else {
            return resJson.message as Error;
        }
    }
}
export default Order;
