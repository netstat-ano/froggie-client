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
import ProductDetail from "./components/ProductDetail/ProductDetail";
import "./index.css";
import Error404 from "./pages/Error404/Error404";
import Cart from "./components/Cart/Cart";
function App() {
    const dispatch = useAppDispatch();
    const logout = () => {
        dispatch(authenticationActions.logout());
        User.clearLocalstorage();
    };

    useEffect(() => {
        const loadedTime = localStorage.getItem("expiresIn");
        let expiresTime;
        if (loadedTime) {
            expiresTime = new Date(loadedTime);
        }
        if (expiresTime) {
            const currentDate = new Date();
            console.log(expiresTime.getTime() - currentDate.getTime());

            if (expiresTime.getTime() - currentDate.getTime() <= 0) {
                logout();
            } else {
                const token = localStorage.getItem("token");
                const userId = localStorage.getItem("userId");
                const type = localStorage.getItem("type");
                dispatch(authenticationActions.login({ token, userId, type }));
                let remainingMiliseconds =
                    expiresTime.getTime() - currentDate.getTime();
                setTimeout(() => {
                    logout();
                }, remainingMiliseconds);
            }
        }
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

                    <Route
                        path="/admin/create-product"
                        element={
                            <Main>
                                <Modal>
                                    <ProductCreator />
                                </Modal>
                            </Main>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <Main>
                                <Cart />
                            </Main>
                        }
                    />
                    <Route
                        path="/:categoryId"
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
                    <Route
                        path="/"
                        element={
                            <Main>
                                <Categories />
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
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
