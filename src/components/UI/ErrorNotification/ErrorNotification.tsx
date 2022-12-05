import styles from "./ErrorNotification.module.scss";
const ErrorNotification: React.FC<{ children: string }> = (props) => {
    return <div className={styles.notification}>{props.children}</div>;
};
export default ErrorNotification;
