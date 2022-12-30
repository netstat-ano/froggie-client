import styles from "./Header.module.scss";
const Header: React.FC<{ children: string; className?: string }> = (props) => {
    return (
        <div>
            <h1
                className={`${styles.header} ${
                    props.className ? props.className : ""
                }`}
            >
                {props.children}
            </h1>
        </div>
    );
};
export default Header;
