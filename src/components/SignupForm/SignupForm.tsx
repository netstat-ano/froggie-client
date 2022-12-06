import { useFormik, FormikErrors } from "formik";
import Input from "../UI/Input/Input";
import SuccessButton from "../UI/SuccessButton/SuccessButton";
import Overlay from "../UI/Overlay/Overlay";
import InputErrorMessage from "../UI/InputErrorMessage/InputErrorMessage";
import { useState } from "react";
import ErrorNotification from "../UI/ErrorNotification/ErrorNotification";
import User from "../../models/User";
import clearNotification from "../../utils/clearNotification";
import { authenticationActions } from "../../store/authentication";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import styles from "./SignupForm.module.scss";
import { useNavigate } from "react-router-dom";
interface FormValues {
    email: string;
    username: string;
    password: string;
    retypePassword: string;
}
const SignupForm: React.FC<{}> = () => {
    const [serverError, setServerError] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const validate = (values: FormValues) => {
        const errors: FormikErrors<FormValues> = {};
        if (!values.username) {
            errors.username = "Required";
        } else if (values.username.length < 4) {
            errors.username = "Must be 4 characters or more";
        }

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

        if (!values.retypePassword) {
            errors.retypePassword = "Required";
        } else if (values.retypePassword !== values.password) {
            errors.retypePassword = "Passwords must be the same";
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
            retypePassword: "",
        },
        validate,
        onSubmit: async (values) => {
            try {
                const user = new User(
                    values.email,
                    values.username,
                    values.password,
                    values.retypePassword
                );
                const response = await user.create();
                if (response!.ok) {
                    const successResponse = await response!.json();
                    values.email = "";
                    values.username = "";
                    values.retypePassword = "";
                    values.password = "";
                    const userSnapshot = await user.login();
                    if (userSnapshot.ok) {
                        dispatch(
                            authenticationActions.login(userSnapshot.userData)
                        );
                        navigate("/");
                    } else {
                        setServerError(userSnapshot.message);
                    }
                } else {
                    const failedResponse = await response!.json();
                    setServerError(failedResponse.message);
                    clearNotification(setServerError, 2000);
                }
            } catch (err) {
                setServerError("Database issue.");
                clearNotification(setServerError, 2000);
                return;
            }
        },
    });
    return (
        <div className={`center ${styles["signup-form"]}`}>
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
                                    placeholder: "Username",
                                    type: "text",
                                    id: "username",
                                    name: "username",
                                    value: formik.values.username,
                                    onChange: formik.handleChange,
                                    onBlur: formik.handleBlur,
                                }}
                                invalid={Boolean(
                                    formik.touched.username &&
                                        formik.errors.username
                                )}
                            />
                            {formik.touched.username &&
                                formik.errors.username && (
                                    <InputErrorMessage
                                        message={formik.errors.username}
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
                        <div>
                            <Input
                                input={{
                                    placeholder: "Retype password",
                                    type: "password",
                                    id: "retypePassword",
                                    name: "retypePassword",
                                    value: formik.values.retypePassword,
                                    onChange: formik.handleChange,
                                    onBlur: formik.handleBlur,
                                }}
                                invalid={Boolean(
                                    formik.touched.retypePassword &&
                                        formik.errors.retypePassword
                                )}
                            />
                            {formik.touched.retypePassword &&
                                formik.errors.retypePassword && (
                                    <InputErrorMessage
                                        message={formik.errors.retypePassword}
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

export default SignupForm;
