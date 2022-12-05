import styles from "./SuccessButton.module.scss";
const SuccessButton: React.FC<{ children: string; button?: {} }> = (props) => {
    return (
        <button {...props.button} className={styles.button}>
            {props.children}
        </button>
    );
};
export default SuccessButton;
