import styles from "./Main.module.scss";
const Main: React.FC<{ children: JSX.Element }> = (props) => {
    return <main className={styles.main}>{props.children}</main>;
};
export default Main;
