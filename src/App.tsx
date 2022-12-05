import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import styles from "./App.module.scss";
import Main from "./components/UI/Main/Main";
import { useEffect } from "react";
function App() {
    useEffect(() => {}, []);
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
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
