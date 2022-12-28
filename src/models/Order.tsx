import OrderSettings from "../interfaces/OrderSettings";
import CartItem from "./CartItem";
import OrderItem from "./OrderItem";
import ResponseApi from "./ResponseApi";
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
            return resJson as ResponseApi;
        }
    }
    static async fetchOrdersByUser(token: string, settings: OrderSettings) {
        const body = settings || {};
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/order/fetch-orders-by-user`,
            {
                method: "POST",
                body: JSON.stringify(body),
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
            return resJson as ResponseApi;
        }
    }
}
export default Order;
