import styles from "./Error404.module.scss";
const Error404: React.FC<{}> = () => {
    return (
        <h1 className={styles.header}>The requested resource was not found.</h1>
    );
};
export default Error404;
