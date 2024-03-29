import OrderItem from "../models/OrderItem";
import ParsedOrders from "../interfaces/ParsedOrders";
const parseOrders = (orders: OrderItem[]) => {
    const parsedOrders: ParsedOrders[] = [];
    const parsedIds: number[] = [];
    orders.forEach((order) => {
        if (parsedIds.indexOf(order.OrderId) === -1) {
            parsedIds.push(order.OrderId);
            parsedOrders.unshift({
                orderId: order.OrderId,
                completed: order.completed,
                canceled: order.canceled,
                locker: order.locker,
                classroom: order.classroom,
                items: orders.filter((ord) => ord.OrderId === order.OrderId),
            });
        }
    });
    return parsedOrders;
};
export default parseOrders;
