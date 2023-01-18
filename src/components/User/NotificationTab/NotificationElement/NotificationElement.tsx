import styles from "./NotificationElement.module.scss";
import Notification from "../../../../models/Notification";
const NotificationElement: React.FC<{
    children: string | JSX.Element;
    notification: Notification;
}> = (props) => {
    return (
        <div
            className={`${styles["notification-element"]} ${
                props.notification.seen === false &&
                styles["notification-element-unseen"]
            }`}
        >
            {props.children}
        </div>
    );
};
export default NotificationElement;
