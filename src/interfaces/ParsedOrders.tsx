import OrderItem from "../models/OrderItem";

interface ParsedOrders {
    orderId: number;
    completed: number;
    canceled: number;
    locker: number;
    classroom: number;
    items: OrderItem[];
}
export default ParsedOrders;
