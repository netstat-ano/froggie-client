import NavButton from "../UI/NavButton/NavButton";
import User from "../../models/User";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { authenticationActions } from "../../store/authentication";
import { useAppSelector } from "../../hooks/use-app-selector";
import UserAdminActions from "../UserAdminActions/UserAdminActions";
const UserActions: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const userType = useAppSelector((state) => state.authentication.type);
    const onLogoutHandler = () => {
        User.clearLocalstorage();
        dispatch(authenticationActions.logout());
    };
    return (
        <nav>
            {userType === "admin" && <UserAdminActions />}
            <NavButton button={{ onClick: onLogoutHandler }}>Log out</NavButton>
        </nav>
    );
};
export default UserActions;
