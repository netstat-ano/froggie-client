import { useAppSelector } from "../../../hooks/use-app-selector";
import styles from "./NotificationTab.module.scss";
import NotificationElement from "./NotificationElement/NotificationElement";
import { useEffect } from "react";
import openSocket from "socket.io-client";
import Notification from "../../../models/Notification";
import { notificationsActions } from "../../../store/notification";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import NavButton from "../../UI/NavButton/NavButton";
const NotificationTab: React.FC<{
    onOut: () => void;
    onOver: () => void;
}> = (props) => {
    const items = useAppSelector((state) => state.notifications.items);
    const UserId = useAppSelector((state) => state.authentication.userId);
    const token = useAppSelector((state) => state.authentication.token);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const listenNotifications = async () => {
            const socket = openSocket(`${process.env.REACT_APP_API_URL}`);
            socket.on("notification", async (data) => {
                if (
                    data.action === "create" &&
                    data.UserId === Number(UserId)
                ) {
                    const fetchedNotifications =
                        await Notification.fetchNotificationsByUser(token);
                    if (typeof fetchedNotifications.ok === "string") {
                        dispatch(
                            notificationsActions.init(
                                fetchedNotifications.notifications
                            )
                        );
                    }
                }
            });
        };
        listenNotifications();
    }, []);
    const onMarkAsSeenHandler = () => {
        dispatch(notificationsActions.markAllAsSeen());
    };
    return (
        <div
            onMouseOver={props.onOver}
            onMouseOut={props.onOut}
            className={styles["notification-tab"]}
        >
            <div>
                <NavButton
                    button={{ onClick: onMarkAsSeenHandler }}
                    className={styles["notification-tab__mark_btn"]}
                >
                    Mark all as seen
                </NavButton>
            </div>
            {items.map((notification) => (
                <NotificationElement
                    key={notification.id}
                    notification={notification}
                >
                    {notification.message}
                </NotificationElement>
            ))}
        </div>
    );
};
export default NotificationTab;
