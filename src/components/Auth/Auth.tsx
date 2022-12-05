import { useParams } from "react-router";
import SignupForm from "../SignupForm/SignupForm";
import LoginForm from "../LoginForm/LoginForm";
const Auth: React.FC<{}> = () => {
    const params = useParams();
    if (params.mode === "login") {
        return <LoginForm />;
    } else if (params.mode === "signup") {
        return <SignupForm />;
    } else {
        return <h1>Error with URL</h1>;
    }
};
export default Auth;
