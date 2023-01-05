import { FormikHelpers, useFormik, FormikErrors } from "formik";
import Input from "../../../UI/Input/Input";
import SuccessButton from "../../../UI/SuccessButton/SuccessButton";
import InputErrorMessage from "../../../UI/InputErrorMessage/InputErrorMessage";
import styles from "./ChangePassword.module.scss";
import User from "../../../../models/User";
import { useAppSelector } from "../../../../hooks/use-app-selector";
import useServerError from "../../../../hooks/use-server-error";
import ErrorNotification from "../../../UI/ErrorNotification/ErrorNotification";
import SuccessNotification from "../../../UI/SuccessNotification/SuccessNotification";
interface FormValues {
    oldPassword: string;
    newPassword: string;
    retypeNewPassword: string;
}
const ChangePassword: React.FC<{}> = () => {
    const token = useAppSelector((state) => state.authentication.token);
    const [serverError, setServerError, stop] = useServerError(2000);
    const [serverSuccess, setServerSuccess, stopSuccess] = useServerError(2000);
    const onSubmitHandler = async (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => {
        const response = await User.changePassword(
            values.oldPassword,
            values.newPassword,
            token
        );
        if (!response.ok) {
            setServerError(response.message);
            stop();
            return;
        }
        formik.resetForm();
        setServerSuccess(response.message);
        stopSuccess();
    };
    const onValidateHandler = (values: FormValues) => {
        const errors: FormikErrors<FormValues> = {};
        if (!values.oldPassword) {
            errors.oldPassword = "Required";
        } else if (values.oldPassword.trim().length < 7) {
            errors.oldPassword = "Must be 8 characters or more";
        }
        if (!values.newPassword) {
            errors.newPassword = "Required";
        } else if (values.newPassword.trim().length < 7) {
            errors.newPassword = "Must be 8 characters or more";
        }
        if (!values.retypeNewPassword) {
            errors.retypeNewPassword = "Required";
        } else if (values.retypeNewPassword.trim().length < 7) {
            errors.retypeNewPassword = "";
        }
        if (values.retypeNewPassword !== values.newPassword) {
            errors.retypeNewPassword = "Password must match";
        }
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            retypeNewPassword: "",
        },
        onSubmit: onSubmitHandler,
        validate: onValidateHandler,
    });
    return (
        <form
            onSubmit={formik.handleSubmit}
            className={`center-column ${styles["change-password"]}`}
        >
            <h4>Change password</h4>
            {serverError && (
                <ErrorNotification>{serverError}</ErrorNotification>
            )}
            {serverSuccess && (
                <SuccessNotification>{serverSuccess}</SuccessNotification>
            )}
            <Input
                input={{
                    placeholder: "Old password",
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    value: formik.values.oldPassword,
                    id: "oldPassword",
                    type: "password",
                }}
                invalid={Boolean(
                    formik.touched.oldPassword && formik.errors.oldPassword
                )}
            />
            {formik.touched.oldPassword && formik.errors.oldPassword && (
                <InputErrorMessage
                    className={styles["input-error"]}
                    message={formik.errors.oldPassword}
                />
            )}
            <Input
                input={{
                    placeholder: "New password",
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    value: formik.values.newPassword,
                    id: "newPassword",
                    type: "password",
                }}
                invalid={Boolean(
                    formik.touched.newPassword && formik.errors.newPassword
                )}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
                <InputErrorMessage
                    className={styles["input-error"]}
                    message={formik.errors.newPassword}
                />
            )}
            <Input
                input={{
                    placeholder: "Retype new password",
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    value: formik.values.retypeNewPassword,
                    id: "retypeNewPassword",
                    type: "password",
                }}
                invalid={Boolean(
                    formik.touched.retypeNewPassword &&
                        formik.errors.retypeNewPassword
                )}
            />
            {formik.touched.retypeNewPassword &&
                formik.errors.retypeNewPassword && (
                    <InputErrorMessage
                        className={styles["input-error"]}
                        message={formik.errors.retypeNewPassword}
                    />
                )}
            <SuccessButton button={{ type: "submit" }}>
                Change password
            </SuccessButton>
        </form>
    );
};
export default ChangePassword;
