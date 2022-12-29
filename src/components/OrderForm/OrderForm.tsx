import { Formik, FormikErrors } from "formik";
import Input from "../UI/Input/Input";
import InputErrorMessage from "../UI/InputErrorMessage/InputErrorMessage";
import SuccessButton from "../UI/SuccessButton/SuccessButton";
import Order from "../../models/Order";
import CartModel from "../../models/Cart";
import { cartActions } from "../../store/cart";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { FormikHelpers } from "formik";
import useServerError from "../../hooks/use-server-error";
import { useNavigate } from "react-router";
import ErrorNotification from "../UI/ErrorNotification/ErrorNotification";
interface FormValues {
    name: string;
    surname: string;
    address: string;
    city: string;
    postalCode: string;
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
        const order = new Order(
            cart.items,
            values.name,
            values.surname,
            values.address,
            values.postalCode,
            values.city
        );
        const response = await order.save(token);
        if (!(response instanceof Array)) {
            setServerMessage(response.message);
            stop();
            return;
        }
        const cartModel = new CartModel(token);
        dispatch(cartActions.reset());
        navigate("/my-orders");
        await cartModel.delete();
    };
    const onValidationHandler = (values: FormValues) => {
        const errors: FormikErrors<FormValues> = {};
        if (!values.name) {
            errors.name = "Required";
        }
        if (!values.surname) {
            errors.surname = "Required";
        }
        if (!values.address) {
            errors.address = "Required";
        }
        if (!values.city) {
            errors.city = "Required";
        }
        if (!values.postalCode) {
            errors.postalCode = "Required";
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
                address: "",
                postalCode: "",
                city: "",
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
                                value: formProps.values.address,
                                placeholder: "Address",
                                id: "address",
                            }}
                            invalid={Boolean(
                                formProps.touched.address &&
                                    formProps.errors.address
                            )}
                        />
                        {formProps.touched.address &&
                            formProps.errors.address && (
                                <InputErrorMessage
                                    message={formProps.errors.address}
                                />
                            )}
                    </div>
                    <div>
                        <Input
                            input={{
                                onChange: formProps.handleChange,
                                onBlur: formProps.handleBlur,
                                value: formProps.values.postalCode,
                                placeholder: "Postal code",
                                id: "postalCode",
                            }}
                            invalid={Boolean(
                                formProps.touched.postalCode &&
                                    formProps.errors.postalCode
                            )}
                        />
                        {formProps.touched.postalCode &&
                            formProps.errors.postalCode && (
                                <InputErrorMessage
                                    message={formProps.errors.postalCode}
                                />
                            )}
                    </div>
                    <div>
                        <Input
                            input={{
                                onChange: formProps.handleChange,
                                onBlur: formProps.handleBlur,
                                value: formProps.values.city,
                                placeholder: "City",
                                id: "city",
                            }}
                            invalid={Boolean(
                                formProps.touched.city && formProps.errors.city
                            )}
                        />
                        {formProps.touched.city && formProps.errors.city && (
                            <InputErrorMessage
                                message={formProps.errors.city}
                            />
                        )}
                    </div>
                    <div>
                        <SuccessButton button={{ type: "submit" }}>
                            Order
                        </SuccessButton>
                    </div>
                </form>
            )}
        </Formik>
    );
};
export default OrderForm;
