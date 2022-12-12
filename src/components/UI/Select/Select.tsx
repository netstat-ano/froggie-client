import styles from "./Select.module.scss";
const Select: React.FC<{
    select?: {};
    children: JSX.Element;
    className?: string;
}> = (props) => {
    return (
        <select
            className={`${props.className ? props.className : ""} ${
                styles.select
            }`}
            {...props.select}
        >
            {props.children}
        </select>
    );
};
export default Select;
