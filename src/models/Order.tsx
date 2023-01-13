import OrderSettings from "../interfaces/OrderSettings";
import CartItem from "./CartItem";
import OrderItem from "./OrderItem";
import ResponseApi from "./ResponseApi";
class Order {
    items: CartItem[];

    name: string;
    surname: string;
    grade: string;
    locker?: number;
    classroom?: number;

    constructor(
        items: CartItem[],
        name: string,
        surname: string,
        grade: string,
        classroom?: number,
        locker?: number
    ) {
        this.items = items;
        this.name = name;
        this.surname = surname;
        this.grade = grade;
        this.classroom = classroom;
        this.locker = locker;
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
                    grade: this.grade,
                    classroom: this.classroom,
                    locker: this.locker,
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
    static async fetchOrders(token: string, settings: OrderSettings) {
        const body = settings || {};
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/order/fetch-orders`,
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
    static async completeOrder(id: number, token: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/order/complete-order`,
            {
                method: "POST",
                body: JSON.stringify({ id }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const resJson = await response.json();

        return resJson as ResponseApi;
    }
    static async cancelOrder(id: number, token: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/order/cancel-order`,
            {
                method: "POST",
                body: JSON.stringify({ id }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const resJson = await response.json();

        return resJson as ResponseApi;
    }
    static async uncompleteOrder(id: number, token: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/order/uncomplete-order`,
            {
                method: "POST",
                body: JSON.stringify({ id }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const resJson = await response.json();

        return resJson as ResponseApi;
    }
    static async fetchCompletedOrders(token: string, settings: OrderSettings) {
        const body = settings || {};
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/order/fetch-completed-orders`,
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
    static async fetchCanceledOrders(token: string, settings: OrderSettings) {
        const body = settings || {};
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/order/fetch-canceled-orders`,
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
    static async fetchUncompletedOrders(
        token: string,
        settings: OrderSettings
    ) {
        const body = settings || {};
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/order/fetch-uncompleted-orders`,
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
    static async fetchCanceledOrdersByUserId(
        token: string,
        settings: OrderSettings
    ) {
        const body = settings || {};
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/order/fetch-canceled-orders-by-user`,
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
    static async fetchCompletedOrdersByUserId(
        token: string,
        settings: OrderSettings
    ) {
        const body = settings || {};
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/order/fetch-completed-orders-by-user`,
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
    static async fetchUncompletedOrdersByUserId(
        token: string,
        settings: OrderSettings
    ) {
        const body = settings || {};
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/order/fetch-uncompleted-orders-by-user`,
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
