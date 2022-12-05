import styles from "./Overlay.module.scss";
const Overlay: React.FC<{ children: JSX.Element; className?: string }> = (
    props
) => {
    return (
        <div
            className={`${styles.overlay} ${
                props.className ? props.className : ""
            }`}
        >
            {props.children}
        </div>
    );
};
export default Overlay;
