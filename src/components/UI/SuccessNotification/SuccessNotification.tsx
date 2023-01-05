import styles from "./SuccessNotification.module.scss";
const SuccessNotification: React.FC<{ children: string | JSX.Element }> = (
    props
) => {
    return <div className={styles.notification}>{props.children}</div>;
};
export default SuccessNotification;
