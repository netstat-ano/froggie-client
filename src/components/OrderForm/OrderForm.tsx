import { Formik, FormikErrors } from "formik";
import Input from "../UI/Input/Input";
import InputErrorMessage from "../UI/InputErrorMessage/InputErrorMessage";
import SuccessButton from "../UI/SuccessButton/SuccessButton";

import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { FormikHelpers } from "formik";
import useServerError from "../../hooks/use-server-error";
import { useNavigate } from "react-router";
import styles from "./OrderForm.module.scss";
import ErrorNotification from "../UI/ErrorNotification/ErrorNotification";
interface FormValues {
    name: string;
    surname: string;
    grade: string;
}
const OrderForm: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.authentication.token);
    const cart = useAppSelector((state) => state.cart);
    const [serverMessage, setServerMessage, stop] = useServerError(2000);
    const navigate = useNavigate();
    const onSubmitHandler = async (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => {
        navigate(
            `/delivery?name=${values.name}&surname=${values.surname}&grade=${values.grade}`
        );
    };
    const onValidationHandler = (values: FormValues) => {
        const errors: FormikErrors<FormValues> = {};
        if (!values.name) {
            errors.name = "Required";
        }
        if (!values.surname) {
            errors.surname = "Required";
        }
        if (!values.grade) {
            errors.grade = "Required";
        }

        return errors;
    };
    return (
        <Formik
            onSubmit={onSubmitHandler}
            validate={onValidationHandler}
            initialValues={{
                name: "",
                surname: "",
                grade: "",
            }}
        >
            {(formProps) => (
                <form onSubmit={formProps.handleSubmit}>
                    {serverMessage && (
                        <ErrorNotification>{serverMessage}</ErrorNotification>
                    )}
                    <div>
                        <Input
                            input={{
                                onChange: formProps.handleChange,
                                onBlur: formProps.handleBlur,
                                value: formProps.values.name,
                                placeholder: "Name",
                                id: "name",
                            }}
                            invalid={Boolean(
                                formProps.touched.name && formProps.errors.name
                            )}
                        />
                        {formProps.touched.name && formProps.errors.name && (
                            <InputErrorMessage
                                message={formProps.errors.name}
                            />
                        )}
                    </div>
                    <div>
                        <Input
                            input={{
                                onChange: formProps.handleChange,
                                onBlur: formProps.handleBlur,
                                value: formProps.values.surname,
                                placeholder: "Surname",
                                id: "surname",
                            }}
                            invalid={Boolean(
                                formProps.touched.surname &&
                                    formProps.errors.surname
                            )}
                        />
                        {formProps.touched.surname &&
                            formProps.errors.surname && (
                                <InputErrorMessage
                                    message={formProps.errors.surname}
                                />
                            )}
                    </div>
                    <div>
                        <Input
                            input={{
                                onChange: formProps.handleChange,
                                onBlur: formProps.handleBlur,
                                value: formProps.values.grade,
                                placeholder: "Grade",
                                id: "grade",
                            }}
                            invalid={Boolean(
                                formProps.touched.grade &&
                                    formProps.errors.grade
                            )}
                        />
                        {formProps.touched.grade && formProps.errors.grade && (
                            <InputErrorMessage
                                message={formProps.errors.grade}
                            />
                        )}
                    </div>

                    <div className={styles["order-form__btn"]}>
                        <SuccessButton button={{ type: "submit" }}>
                            Go to delivery
                        </SuccessButton>
                    </div>
                </form>
            )}
        </Formik>
    );
};
export default OrderForm;
