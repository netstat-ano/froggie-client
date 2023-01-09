import SuccessButton from "../../UI/SuccessButton/SuccessButton";
import { Link } from "react-router-dom";
import styles from "./UserAdminActions.module.scss";
const UserAdminActions: React.FC<{}> = () => {
    return (
        <>
            <Link to="/admin/create-product">
                <SuccessButton className={styles["user-admin-actions__btn"]}>
                    Create a product
                </SuccessButton>
            </Link>
        </>
    );
};
export default UserAdminActions;
