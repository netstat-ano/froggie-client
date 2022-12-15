import styles from "./HeaderImage.module.scss";
const HeaderImage: React.FC<{ url: string }> = (props) => {
    return <img className={styles["img"]} src={props.url}></img>;
};
export default HeaderImage;
