import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/use-app-selector";
import styles from "./Layout.module.scss";
import NavButton from "../UI/NavButton/NavButton";
import UserActions from "../UserActions/UserActions";
const Layout: React.FC<{ children: JSX.Element }> = (props) => {
    const token = useAppSelector((state) => state.authentication.token);
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
                    {!token && (
                        <nav>
                            <Link className="link" to="/authentication/login">
                                <NavButton>Log in</NavButton>
                            </Link>
                            <Link className="link" to="/authentication/signup">
                                <NavButton>Sign up</NavButton>
                            </Link>
                        </nav>
                    )}
                    {token && <UserActions />}
                </div>
            </div>
            {props.children}
        </>
    );
};
export default Layout;
