import styles from "./NavButton.module.scss";
const NavButton: React.FC<{
    children: string | JSX.Element;
    button?: {};
    className?: string;
    disableBorder?: boolean;
}> = (props) => {
    return (
        <button
            {...props.button}
            className={`${
                props.disableBorder
                    ? styles["btn-without-border"]
                    : styles.button
            } ${props.className ? props.className : ""}`}
        >
            {props.children}
        </button>
    );
};
export default NavButton;
