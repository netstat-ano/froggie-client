import Accordion from "../../components/UI/Accordion/Accordion";
import Header from "../../components/UI/Header/Header";
import PasswordSettings from "../../components/User/PasswordSettings/PasswordSettings";
import { useAppSelector } from "../../hooks/use-app-selector";
import { useEffect } from "react";
import { useNavigate } from "react-router";
const MyAccount: React.FC<{}> = () => {
    const token = useAppSelector((state) => state.authentication.token);
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate("/unauthorized");
        }
    }, []);
    return (
        <div>
            <Accordion
                elements={[
                    {
                        showed: <Header>Password</Header>,
                        hidden: <PasswordSettings />,
                    },
                ]}
            />
        </div>
    );
};
export default MyAccount;
