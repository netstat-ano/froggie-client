import OrderItem from "../models/OrderItem";

interface ParsedOrders {
    orderId: number;
    items: OrderItem[];
}
export default ParsedOrders;
