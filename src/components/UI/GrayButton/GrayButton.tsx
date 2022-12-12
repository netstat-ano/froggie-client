import styles from "./GrayButton.module.scss";
const GrayButton: React.FC<{ children: string; className?: string }> = (
    props
) => {
    return (
        <button
            className={`${props.className ? props.className : ""} ${
                styles.button
            }`}
        >
            {props.children}
        </button>
    );
};
export default GrayButton;
