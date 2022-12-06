import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/use-app-selector";
import styles from "./Layout.module.scss";
import NavButton from "../UI/NavButton/NavButton";
import User from "../../models/User";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { authenticationActions } from "../../store/authentication";
const Layout: React.FC<{ children: JSX.Element }> = (props) => {
    const token = useAppSelector((state) => state.authentication.token);
    const dispatch = useAppDispatch();
    const onLogoutHandler = () => {
        User.clearLocalstorage();
        dispatch(authenticationActions.logout());
    };
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
                                <span>Log in</span>
                            </Link>
                            <Link className="link" to="/authentication/signup">
                                <span>Sign up</span>
                            </Link>
                        </nav>
                    )}
                    {token && (
                        <nav>
                            <NavButton button={{ onClick: onLogoutHandler }}>
                                Log out
                            </NavButton>
                        </nav>
                    )}
                </div>
            </div>
            {props.children}
        </>
    );
};
export default Layout;
