import styles from "./CanceledButton.module.scss";
const CanceledButton: React.FC<{
    button?: {};
    children: string;
}> = (props) => {
    return (
        <button {...props.button} className={styles.button}>
            {props.children}
        </button>
    );
};
export default CanceledButton;
