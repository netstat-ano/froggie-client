import styles from "./HoverMenu.module.scss";
const HoverMenu: React.FC<{
    children: JSX.Element;
    className: string;
    div?: {};
}> = (props) => {
    return (
        <div
            {...props.div}
            className={`${styles["hover-menu"]} ${
                props.className ? props.className : ""
            }`}
        >
            <ul className={styles["hover-menu__list"]}>{props.children}</ul>
        </div>
    );
};
export default HoverMenu;
