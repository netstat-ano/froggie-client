import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Order from "../../models/Order";
import { useAppSelector } from "../../hooks/use-app-selector";
import OrderItem from "../../models/OrderItem";
import OrderCard from "../../components/OrderCard/OrderCard";
import parseOrders from "../../utils/parseOrders";
import ParsedOrders from "../../interfaces/ParsedOrders";
const Orders: React.FC<{}> = () => {
    const [orders, setOrders] = useState<ParsedOrders[]>([]);
    const token = useAppSelector((state) => state.authentication.token);
    useEffect(() => {
        const fetchOrders = async () => {
            const fetchedOrders = await Order.fetchOrdersByUser(token);
            if (fetchedOrders instanceof Array) {
                setOrders(parseOrders(fetchedOrders));
            }
        };
        fetchOrders();
    }, []);

    return (
        <div>
            {orders?.map((order) => (
                <OrderCard order={order} key={order.orderId} />
            ))}
        </div>
    );
};
export default Orders;
