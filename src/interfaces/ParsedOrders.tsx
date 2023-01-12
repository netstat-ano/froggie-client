import OrderItem from "../models/OrderItem";

interface ParsedOrders {
    orderId: number;
    completed: number;
    canceled: number;
    items: OrderItem[];
}
export default ParsedOrders;
