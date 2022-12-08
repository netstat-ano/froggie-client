import styles from "./Textarea.module.scss";
const Textarea: React.FC<{
    textarea?: {};
    className?: string;
    invalid: boolean;
}> = (props) => {
    return (
        <textarea
            {...props.textarea}
            className={`${styles.textarea} ${
                props.invalid ? styles.invalid : ""
            } ${props.className ? props.className : ""}`}
        ></textarea>
    );
};
export default Textarea;
