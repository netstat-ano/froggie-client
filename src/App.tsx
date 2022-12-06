import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import styles from "./App.module.scss";
import Main from "./components/UI/Main/Main";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/use-app-dispatch";
import { authenticationActions } from "./store/authentication";
import User from "./models/User";
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
                        path="/"
                        element={
                            <Main>
                                <></>
                            </Main>
                        }
                    />
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
