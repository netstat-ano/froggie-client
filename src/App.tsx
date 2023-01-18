import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import styles from "./App.module.scss";
import Main from "./components/UI/Main/Main";
import Modal from "./components/UI/Modal/Modal";
import ProductCreator from "./pages/ProductCreator/ProductCreator";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/use-app-dispatch";
import { authenticationActions } from "./store/authentication";
import User from "./models/User";
import Categories from "./pages/Categories/Categories";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import "./index.css";
import Error404 from "./pages/Error404/Error404";
import Cart from "./pages/Cart/Cart";
import CartItem from "./models/CartItem";
import { cartActions } from "./store/cart";
import { useAppSelector } from "./hooks/use-app-selector";
import Orders from "./pages/Orders/Orders";
import Notification from "./models/Notification";
import Order from "./pages/Order/Order";
import MyAccount from "./pages/MyAccount/MyAccount";
import SignupForm from "./pages/Auth/SignupForm/SignupForm";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import Delivery from "./pages/Delivery/Delivery";
import { notificationsActions } from "./store/notification";
import openSocket from "socket.io-client";
function App() {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.authentication.token);
    const type = useAppSelector((state) => state.authentication.type);
    const logout = () => {
        dispatch(authenticationActions.logout());
        User.clearLocalstorage();
    };
    const cart = useAppSelector((state) => state.cart);
    useEffect(() => {
        const fetchUser = async () => {
            const loadedTime = localStorage.getItem("expiresIn");
            let expiresTime;
            if (loadedTime) {
                expiresTime = new Date(loadedTime);
            }
            if (expiresTime) {
                const currentDate = new Date();

                if (expiresTime.getTime() - currentDate.getTime() <= 0) {
                    logout();
                } else {
                    const token = localStorage.getItem("token");
                    const userId = localStorage.getItem("userId");
                    const type = localStorage.getItem("type");
                    const notifications =
                        await Notification.fetchNotificationsByUser(token!);

                    dispatch(
                        authenticationActions.login({ token, userId, type })
                    );
                    if (typeof notifications.ok === "string") {
                        dispatch(
                            notificationsActions.init(
                                notifications.notifications
                            )
                        );
                    }
                    let remainingMiliseconds =
                        expiresTime.getTime() - currentDate.getTime();
                    if (cart.items.length === 0) {
                        const fetchedCart = await CartItem.fetchCart(token!);
                        if (fetchedCart instanceof Array) {
                            dispatch(cartActions.init(fetchedCart));
                        }
                    }
                    setTimeout(() => {
                        logout();
                        dispatch(cartActions.reset());
                        dispatch(notificationsActions.reset());
                    }, remainingMiliseconds);
                }
            }
        };
        fetchUser();
    }, []);
    return (
        <div className={styles.app}>
            <Layout>
                <Routes>
                    <Route
                        path="/authentication/:mode"
                        element={
                            <Main>
                                <Auth />
                            </Main>
                        }
                    />
                    {type === "admin" && (
                        <Route
                            path="/admin/create-product"
                            element={
                                <Main>
                                    <ProductCreator />
                                </Main>
                            }
                        />
                    )}
                    {type === "customer" && (
                        <Route
                            path="/cart"
                            element={
                                <Main>
                                    <Cart />
                                </Main>
                            }
                        />
                    )}
                    {token && (
                        <Route
                            path="/my-orders"
                            element={
                                <Main>
                                    <Orders />
                                </Main>
                            }
                        />
                    )}
                    {token && (
                        <Route
                            path="/my-orders/:orderType"
                            element={
                                <Main>
                                    <Orders />
                                </Main>
                            }
                        />
                    )}
                    <Route
                        path="/unauthorized"
                        element={
                            <Main>
                                <Unauthorized />
                            </Main>
                        }
                    />
                    {type === "customer" && (
                        <Route
                            path="/order"
                            element={
                                <Main>
                                    <Order />
                                </Main>
                            }
                        />
                    )}
                    {type === "customer" && (
                        <Route
                            path="/delivery"
                            element={
                                <Main>
                                    <Delivery />
                                </Main>
                            }
                        />
                    )}
                    <Route
                        path="/category/:categoryId"
                        element={
                            <Main>
                                <Products />
                            </Main>
                        }
                    />
                    <Route
                        path="/product/:productId"
                        element={
                            <Main>
                                <ProductDetail />
                            </Main>
                        }
                    />
                    <Route
                        path="/404"
                        element={
                            <Main>
                                <Error404 />
                            </Main>
                        }
                    />
                    {token && (
                        <Route
                            path="/my-account"
                            element={
                                <Main>
                                    <MyAccount />
                                </Main>
                            }
                        />
                    )}
                    <Route
                        path="/admin/signup"
                        element={
                            <Main>
                                <SignupForm admin={true} />
                            </Main>
                        }
                    />
                    <Route
                        path="/*"
                        element={
                            <Main>
                                <Error404 />
                            </Main>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <Main>
                                <>
                                    <Categories />
                                </>
                            </Main>
                        }
                    />
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
