import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Order from "../../models/Order";
import { useAppSelector } from "../../hooks/use-app-selector";
import OrderItem from "../../models/OrderItem";
import OrderCard from "../../components/OrderCard/OrderCard";
import parseOrders from "../../utils/parseOrders";
import ParsedOrders from "../../interfaces/ParsedOrders";
import Header from "../../components/UI/Header/Header";
import useLoading from "../../hooks/use-loading";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import Select from "../../components/UI/Select/Select";
import styles from "./Orders.module.scss";
import OrderSettings from "../../interfaces/OrderSettings";
const Orders: React.FC<{}> = () => {
    const [orders, setOrders] = useState<ParsedOrders[]>([]);
    const token = useAppSelector((state) => state.authentication.token);
    const type = useAppSelector((state) => state.authentication.type);
    const [serverMessage, setServerMessage] = useState("");
    const [isLoading, stopLoading] = useLoading();
    const fetchOrders = async (settings: OrderSettings) => {
        // if (type === "customer") {
        var fetchedOrders = await Order.fetchOrdersByUser(token, settings);
        // } else {
        //     var fetchedOrders = await Order.fetchOrders(token);
        // }
        if (fetchedOrders instanceof Array) {
            setOrders(parseOrders(fetchedOrders));
            stopLoading();
        } else {
            stopLoading();
            setServerMessage(fetchedOrders.message);
        }
    };
    useEffect(() => {
        fetchOrders({});
    }, [token]);
    const onSortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "OLDEST") {
            fetchOrders({ sort: "orders.createdAt DESC" });
        } else if (value === "NEWEST") {
            fetchOrders({ sort: "orders.createdAt ASC" });
        } else {
            fetchOrders({});
        }
    };
    return (
        <>
            {isLoading && <LoadingSpinner />}
            {serverMessage && <Header>{serverMessage}</Header>}
            {orders && !isLoading && (
                <div className={`center ${styles["orders__sort"]}`}>
                    <Select select={{ onChange: onSortHandler }}>
                        <>
                            <option>Default</option>
                            <option value="NEWEST">Sort by newest</option>
                            <option value="OLDEST">Sort by oldest</option>
                        </>
                    </Select>
                </div>
            )}
            <div className="center-column">
                {orders?.map((order) => (
                    <OrderCard order={order} key={order.orderId} />
                ))}
            </div>
        </>
    );
};
export default Orders;
