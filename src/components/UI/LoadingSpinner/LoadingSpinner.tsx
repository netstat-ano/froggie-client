import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styles from "./LoadingSpinner.module.scss";
const LoadingSpinner: React.FC<{}> = () => {
    return (
        <div className={`center ${styles["loading-spinner__container"]}`}>
            <FontAwesomeIcon
                className={`fa-spin ${styles["loading-spinner__container__icon"]}`}
                icon={faSpinner}
            />
        </div>
    );
};
export default LoadingSpinner;
