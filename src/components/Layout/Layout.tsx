import { Link } from "react-router-dom";
import styles from "./Layout.module.scss";
const Layout: React.FC<{ children: JSX.Element }> = (props) => {
    return (
        <>
            <div className={styles["header"]}>
                <div>
                    <h1>
                        <Link
                            className={`link ${styles["header__headline"]}`}
                            to="/"
                        >
                            Frog
                            <span className={styles["header__headline-green"]}>
                                gie
                            </span>
                        </Link>
                    </h1>
                </div>
                <div className={styles["header__actions"]}>
                    <Link className="link" to="/authentication/login">
                        <span>Log in</span>
                    </Link>
                    <Link className="link" to="/authentication/signup">
                        <span>Sign up</span>
                    </Link>
                </div>
            </div>
            {props.children}
        </>
    );
};
export default Layout;
