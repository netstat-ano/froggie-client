import { NavLink, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Order from "../../models/Order";
import { useAppSelector } from "../../hooks/use-app-selector";
import OrderCard from "../../components/OrderCard/OrderCard";
import parseOrders from "../../utils/parseOrders";
import ParsedOrders from "../../interfaces/ParsedOrders";
import Header from "../../components/UI/Header/Header";
import useLoading from "../../hooks/use-loading";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import Select from "../../components/UI/Select/Select";
import styles from "./Orders.module.scss";
import OrderSettings from "../../interfaces/SortSettings";
import NavButton from "../../components/UI/NavButton/NavButton";
import openSocket from "socket.io-client";
const Orders: React.FC<{}> = () => {
    const [orders, setOrders] = useState<ParsedOrders[]>([]);
    const token = useAppSelector((state) => state.authentication.token);
    const type = useAppSelector((state) => state.authentication.type);
    const { orderType } = useParams();
    const navigate = useNavigate();
    const UserId = useAppSelector((state) => state.authentication.userId);
    const [serverMessage, setServerMessage] = useState("");
    const [isLoading, stopLoading] = useLoading();
    useEffect(() => {
        if (orders.length === 0) {
            setServerMessage("Orders not found.");
        }
    }, [orders]);
    const fetchOrders = async (settings: OrderSettings) => {
        if (type === "customer") {
            if (orderType === "completed") {
                var fetchedOrders = await Order.fetchCompletedOrdersByUserId(
                    token,
                    settings
                );
            } else if (orderType === "canceled") {
                var fetchedOrders = await Order.fetchCanceledOrdersByUserId(
                    token,
                    settings
                );
            } else if (orderType === "uncompleted") {
                var fetchedOrders = await Order.fetchUncompletedOrdersByUserId(
                    token,
                    settings
                );
            } else {
                setServerMessage("Server issues.");
                return;
            }
        } else if (type === "admin") {
            if (orderType === "completed") {
                var fetchedOrders = await Order.fetchCompletedOrders(
                    token,
                    settings
                );
            } else if (orderType === "canceled") {
                var fetchedOrders = await Order.fetchCanceledOrders(
                    token,
                    settings
                );
            } else if (orderType === "uncompleted") {
                var fetchedOrders = await Order.fetchUncompletedOrders(
                    token,
                    settings
                );
            } else {
                setServerMessage("Server issues.");
                return;
            }
        } else {
            navigate("/unauthorized");
            return;
        }
        console.log(fetchedOrders);

        if (fetchedOrders instanceof Array) {
            setOrders(parseOrders(fetchedOrders));
            setServerMessage("");
            stopLoading();
        } else {
            setOrders([]);
            stopLoading();
            setServerMessage(fetchedOrders.message);
        }
    };
    useEffect(() => {
        fetchOrders({});
    }, [token, orderType]);
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
            {!isLoading && (
                <div className="center">
                    <div>
                        <NavLink to="/my-orders/completed">
                            {({ isActive }) => (
                                <NavButton
                                    className={`${
                                        styles["orders__navbutton"]
                                    } ${isActive ? "nav-button__active" : ""} `}
                                >
                                    Completed
                                </NavButton>
                            )}
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/my-orders/uncompleted">
                            {({ isActive }) => (
                                <NavButton
                                    className={`${
                                        styles["orders__navbutton"]
                                    } ${
                                        isActive ? "nav-button__active" : ""
                                    }  `}
                                >
                                    Uncompleted
                                </NavButton>
                            )}
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/my-orders/canceled">
                            {({ isActive }) => (
                                <NavButton
                                    className={`${
                                        styles["orders__navbutton"]
                                    } ${
                                        isActive ? "nav-button__active" : ""
                                    }  `}
                                >
                                    Canceled
                                </NavButton>
                            )}
                        </NavLink>
                    </div>
                </div>
            )}
            {serverMessage && (
                <div className="center">
                    <Header>{serverMessage}</Header>
                </div>
            )}
            {orders.length > 0 && !isLoading && (
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
                    <OrderCard
                        setOrders={setOrders}
                        order={order}
                        key={order.orderId}
                    />
                ))}
            </div>
        </>
    );
};
export default Orders;
