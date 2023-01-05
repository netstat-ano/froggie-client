import Accordion from "../../components/UI/Accordion/Accordion";
import Header from "../../components/UI/Header/Header";
import PasswordSettings from "../../components/User/PasswordSettings/PasswordSettings";
const MyAccount: React.FC<{}> = () => {
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
