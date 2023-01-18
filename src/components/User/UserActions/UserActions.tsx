import NavButton from "../../UI/NavButton/NavButton";
import User from "../../../models/User";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import { authenticationActions } from "../../../store/authentication";
import { useAppSelector } from "../../../hooks/use-app-selector";
import UserAdminActions from "../UserAdminActions/UserAdminActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import styles from "./UserActions.module.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { faUser, faBell, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import UserMenu from "../UserMenu/UserMenu";
import Notification from "../../../models/Notification";
import { cartActions } from "../../../store/cart";
import { notificationsActions } from "../../../store/notification";
import NotificationTab from "../NotificationTab/NotificationTab";

const UserActions: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userType = useAppSelector((state) => state.authentication.type);
    const [isMenuUserShowed, setIsMenuUserShowed] = useState(false);
    const [isNotificationTabShowed, setIsNotificationTabShowed] =
        useState(false);
    const cart = useAppSelector((state) => state.cart);
    const token = useAppSelector((state) => state.authentication.token);
    const notifications = useAppSelector((state) => state.notifications.items);
    const onLogoutHandler = () => {
        User.clearLocalstorage();
        navigate("/");
        dispatch(cartActions.reset());
        dispatch(notificationsActions.reset());
        dispatch(authenticationActions.logout());
    };
    const onOverUserHandler = () => {
        setIsMenuUserShowed(true);
    };
    const onOutUserHandler = () => {
        setIsMenuUserShowed(false);
    };
    const onOverNotificationHandler = () => {
        setIsNotificationTabShowed(true);
        Notification.markNotificationsAsSeen(token);
    };
    const onOutNotificationHandler = () => {
        setIsNotificationTabShowed(false);
    };
    return (
        <nav className={styles["user-actions"]}>
            {userType === "customer" && (
                <NavButton
                    button={{
                        onMouseOver: onOverNotificationHandler,
                        onMouseOut: onOutNotificationHandler,
                    }}
                    className={styles["user-action__element"]}
                >
                    <>
                        {notifications.length > 0 && !notifications[0].seen && (
                            <FontAwesomeIcon
                                className={
                                    styles["user-action__element__circle"]
                                }
                                icon={faCircle}
                            />
                        )}
                        <FontAwesomeIcon icon={faBell} />
                    </>
                </NavButton>
            )}
            {isNotificationTabShowed && (
                <NotificationTab
                    onOut={onOutNotificationHandler}
                    onOver={onOverNotificationHandler}
                />
            )}
            <NavButton
                button={{
                    onMouseOver: onOverUserHandler,
                    onMouseOut: onOutUserHandler,
                }}
                disableBorder={true}
                className={styles["user-action__element"]}
            >
                <FontAwesomeIcon icon={faUser} />
            </NavButton>
            {isMenuUserShowed && (
                <UserMenu onOver={onOverUserHandler} onOut={onOutUserHandler} />
            )}
            {userType === "customer" && (
                <NavButton className={styles["user-action__element"]}>
                    <Link className="link" to="/cart">
                        {cart.items.length > 0 && (
                            <div
                                className={
                                    styles[
                                        "user-action__element__total-products"
                                    ]
                                }
                            >
                                {cart.totalProducts}
                            </div>
                        )}
                        <FontAwesomeIcon icon={faCartShopping} />
                    </Link>
                </NavButton>
            )}

            {userType === "admin" && <UserAdminActions />}
            <NavButton button={{ onClick: onLogoutHandler }}>Log out</NavButton>
        </nav>
    );
};
export default UserActions;
