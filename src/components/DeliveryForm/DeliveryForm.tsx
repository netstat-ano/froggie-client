import { useFormik, FormikErrors } from "formik";
import Input from "../UI/Input/Input";
import InputErrorMessage from "../UI/InputErrorMessage/InputErrorMessage";
import SuccessButton from "../UI/SuccessButton/SuccessButton";
import Order from "../../models/Order";
import { useAppSelector } from "../../hooks/use-app-selector";
import CartModel from "../../models/Cart";
import { cartActions } from "../../store/cart";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useServerError from "../../hooks/use-server-error";
import ErrorNotification from "../UI/ErrorNotification/ErrorNotification";
interface FormValues {
    number: string | number;
}

const DeliveryForm: React.FC<{ type: string | undefined }> = (props) => {
    const cart = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.authentication.token);
    const navigate = useNavigate();
    const [serverMessage, setServerMessage, stop] = useServerError(2000);
    const [searchParams, setSearchParams] = useSearchParams();
    const onSubmitHandler = async (values: FormValues) => {
        const name = searchParams.get("name");
        const surname = searchParams.get("surname");
        const grade = searchParams.get("grade");
        if (name && surname && grade) {
            if (props.type === "classroom") {
                var order = new Order(
                    cart.items,
                    name,
                    surname,
                    grade,
                    Number(values.number),
                    undefined
                );
            } else {
                var order = new Order(
                    cart.items,
                    name,
                    surname,
                    grade,
                    undefined,
                    Number(values.number)
                );
            }
            const response = await order.save(token);

            if (!response.ok) {
                setServerMessage(response.message);
                stop();
            } else {
                const cartModel = new CartModel(token);
                dispatch(cartActions.reset());
                navigate("/my-orders/uncompleted");
                await cartModel.delete();
            }
        }
    };
    const onValidateHandler = (values: FormValues) => {
        const errors: FormikErrors<FormValues> = {};
        if (!values.number) {
            errors.number = "Required";
        }

        return errors;
    };
    const formik = useFormik({
        initialValues: {
            number: "",
        },
        onSubmit: onSubmitHandler,
        validate: onValidateHandler,
    });
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue("number", parseInt(e.target.value));
    };
    if (!props.type) {
        return <></>;
    }
    return (
        <form onSubmit={formik.handleSubmit} className="center-column">
            {serverMessage && (
                <ErrorNotification>{serverMessage}</ErrorNotification>
            )}
            <Input
                invalid={Boolean(formik.touched.number && formik.errors.number)}
                input={{
                    type: "number",
                    placeholder: `${
                        props.type === "classroom"
                            ? "Classroom number"
                            : "Locker number"
                    }`,
                    value: formik.values.number,
                    onBlur: formik.handleBlur,
                    onChange: onChangeHandler,
                }}
            />
            {formik.touched.number && formik.errors.number && (
                <InputErrorMessage message={formik.errors.number} />
            )}

            <SuccessButton button={{ type: "submit" }}>
                Finish order
            </SuccessButton>
        </form>
    );
};
export default DeliveryForm;
