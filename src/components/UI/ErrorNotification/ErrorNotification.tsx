import styles from "./ErrorNotification.module.scss";
const ErrorNotification: React.FC<{ children: string; className?: string }> = (
    props
) => {
    return (
        <div
            className={`${styles.notification} ${
                props.className ? props.className : ""
            }`}
        >
            {props.children}
        </div>
    );
};
export default ErrorNotification;
