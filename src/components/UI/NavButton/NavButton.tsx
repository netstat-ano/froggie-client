import styles from "./NavButton.module.scss";
const NavButton: React.FC<{ children: string; button: {} }> = (props) => {
    return (
        <button {...props.button} className={styles.button}>
            {props.children}
        </button>
    );
};
export default NavButton;
