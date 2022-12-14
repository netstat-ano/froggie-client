import SuccessButton from "../UI/SuccessButton/SuccessButton";
import { Link } from "react-router-dom";
const UserAdminActions: React.FC<{}> = () => {
    return (
        <>
            <Link to="/admin/create-product">
                <SuccessButton>Create a product</SuccessButton>
            </Link>
        </>
    );
};
export default UserAdminActions;
