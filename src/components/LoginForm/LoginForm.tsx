import { useFormik, FormikErrors } from "formik";
import User from "../../models/User";
import { useState } from "react";
import Overlay from "../UI/Overlay/Overlay";
import Input from "../UI/Input/Input";
import InputErrorMessage from "../UI/InputErrorMessage/InputErrorMessage";
import SuccessButton from "../UI/SuccessButton/SuccessButton";
import { authenticationActions } from "../../store/authentication";
import ErrorNotification from "../UI/ErrorNotification/ErrorNotification";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
interface FormValues {
    email: string;
    password: string;
}
const LoginForm: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const validate = (values: FormValues) => {
        const errors: FormikErrors<FormValues> = {};
        if (!values.password) {
            errors.password = "Required";
        } else if (values.password.length < 7) {
            errors.password = "Must be 8 characters or more";
        }

        if (!values.email) {
            errors.email = "Required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = "Invalid email address";
        }
    };
    const [serverError, setServerError] = useState<string>("");
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate,
        onSubmit: async (values) => {
            try {
                const user = new User(
                    values.email,
                    undefined,
                    values.password,
                    undefined
                );
                const userSnapshot = await user.login();
                if (userSnapshot.ok) {
                    dispatch(
                        authenticationActions.login(userSnapshot.userData)
                    );
                } else {
                    setServerError(userSnapshot.message);
                }
            } catch (err) {
                setServerError("Database issue.");
            }
        },
    });
    return (
        <div className="center">
            <Overlay>
                <>
                    {serverError && (
                        <ErrorNotification>{serverError}</ErrorNotification>
                    )}
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <Input
                                input={{
                                    placeholder: "E-mail",
                                    type: "email",
                                    id: "email",
                                    name: "email",
                                    onBlur: formik.handleBlur,
                                    value: formik.values.email,
                                    onChange: formik.handleChange,
                                }}
                                invalid={Boolean(
                                    formik.touched.email && formik.errors.email
                                )}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <InputErrorMessage
                                    message={formik.errors.email}
                                />
                            )}
                        </div>
                        <div>
                            <Input
                                input={{
                                    placeholder: "Password",
                                    type: "password",
                                    id: "password",
                                    name: "password",
                                    value: formik.values.password,
                                    onChange: formik.handleChange,
                                    onBlur: formik.handleBlur,
                                }}
                                invalid={Boolean(
                                    formik.touched.password &&
                                        formik.errors.password
                                )}
                            />
                            {formik.touched.password &&
                                formik.errors.password && (
                                    <InputErrorMessage
                                        message={formik.errors.password}
                                    />
                                )}
                        </div>
                        <SuccessButton button={{ type: "submit" }}>
                            Sign up
                        </SuccessButton>
                    </form>
                </>
            </Overlay>
        </div>
    );
};
export default LoginForm;
