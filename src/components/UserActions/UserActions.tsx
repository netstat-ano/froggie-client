import NavButton from "../UI/NavButton/NavButton";
import User from "../../models/User";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { authenticationActions } from "../../store/authentication";
import { useAppSelector } from "../../hooks/use-app-selector";
import UserAdminActions from "../UserAdminActions/UserAdminActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import styles from "./UserActions.module.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const UserActions: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userType = useAppSelector((state) => state.authentication.type);
    const onLogoutHandler = () => {
        User.clearLocalstorage();
        navigate("/");
        dispatch(authenticationActions.logout());
    };
    return (
        <nav>
            <NavButton className={styles["user-action__element"]}>
                <Link className="link" to="/cart">
                    <FontAwesomeIcon icon={faCartShopping} />
                </Link>
            </NavButton>
            {userType === "admin" && <UserAdminActions />}
            <NavButton button={{ onClick: onLogoutHandler }}>Log out</NavButton>
        </nav>
    );
};
export default UserActions;
