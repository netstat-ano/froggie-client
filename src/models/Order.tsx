import OrderSettings from "../interfaces/OrderSettings";
import CartItem from "./CartItem";
import OrderItem from "./OrderItem";
import ResponseApi from "./ResponseApi";
class Order {
    items: CartItem[];

    name: string;
    surname: string;
    address: string;
    postalCode: string;
    city: string;

    constructor(
        items: CartItem[],
        name: string,
        surname: string,
        address: string,
        postalCode: string,
        city: string
    ) {
        this.items = items;
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.postalCode = postalCode;
        this.city = city;
    }
    async save(token: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/order/add-order`,
            {
                method: "POST",
                body: JSON.stringify({
                    cartItems: this.items,
                    name: this.name,
                    surname: this.surname,
                    address: this.address,
                    postalCode: this.postalCode,
                    city: this.city,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const resJson = await response.json();

        return resJson as ResponseApi;
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
    static async checkIfUserPurchaseProduct(token: string, id: number) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/order/check-if-user-purchase`,
            {
                method: "POST",
                body: JSON.stringify({ id: id }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const resJson = await response.json();

        return resJson.confirmed as number;
    }
}
export default Order;
