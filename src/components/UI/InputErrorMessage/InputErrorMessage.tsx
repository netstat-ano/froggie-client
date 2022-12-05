import styles from "./InputErrorMessage.module.scss";
const InputErrorMessage: React.FC<{ message: string }> = (props) => {
    return <div className={styles.error}>{props.message}</div>;
};
export default InputErrorMessage;
