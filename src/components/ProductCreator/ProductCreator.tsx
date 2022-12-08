import Overlay from "../UI/Overlay/Overlay";
import styles from "./ProductCreator.module.scss";
import Input from "../UI/Input/Input";
import { useFormik, FormikErrors, Form, Formik } from "formik";
import InputErrorMessage from "../UI/InputErrorMessage/InputErrorMessage";
import SuccessButton from "../UI/SuccessButton/SuccessButton";
import Textarea from "../UI/Textarea/Textarea";
import FileInput from "../UI/FileInput/FileInput";
import React, { useState } from "react";
import Product from "../../models/Product";
import { useAppSelector } from "../../hooks/use-app-selector";
interface FormValues {
    productName: string;
    description: string;
    images: string;
}
const ProductCreator: React.FC<{}> = () => {
    const token = useAppSelector((state) => state.authentication.token);
    const [images, setImages] = useState<FileList>();
    const validate = (values: FormValues) => {
        const errors: FormikErrors<FormValues> = {};

        if (!values.productName) {
            errors.productName = "Required";
        }

        if (!values.description) {
            errors.description = "Required";
        }
        if (!values.images) {
            errors.images = "Required";
        }
        return errors;
    };
    const onSubmitHandler = (values: FormValues) => {
        const product = new Product(
            values.productName,
            values.description,
            images
        );
        product.save(token);
    };
    return (
        <Overlay className={styles["product-creator"]}>
            <Formik
                initialValues={{ productName: "", description: "", images: "" }}
                validate={validate}
                onSubmit={onSubmitHandler}
            >
                {(formProps) => (
                    <Form>
                        <div>
                            <Input
                                input={{
                                    placeholder: "Name",
                                    type: "text",
                                    id: "productName",
                                    name: "productName",
                                    onBlur: formProps.handleBlur,
                                    value: formProps.values.productName,
                                    onChange: formProps.handleChange,
                                }}
                                invalid={Boolean(
                                    formProps.touched.productName &&
                                        formProps.errors.productName
                                )}
                            />
                            {formProps.touched.productName &&
                                formProps.errors.productName && (
                                    <InputErrorMessage
                                        message={formProps.errors.productName}
                                    />
                                )}
                        </div>
                        <div>
                            <FileInput
                                input={{
                                    accept: "image/png, image/jpeg",
                                    id: "images",
                                    name: "images",
                                    multiple: "multiple",
                                    onChange: (
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        formProps.setFieldValue(
                                            "images",
                                            event.target.files
                                        );
                                        if (event.target.files) {
                                            setImages(event.target.files);
                                        }
                                    },
                                }}
                                invalid={Boolean(
                                    formProps.touched.images &&
                                        formProps.errors.images
                                )}
                            />
                            {formProps.touched.images &&
                                formProps.errors.images && (
                                    <InputErrorMessage
                                        message={formProps.errors.images}
                                    />
                                )}
                        </div>
                        <div>
                            <Textarea
                                textarea={{
                                    placeholder: "Description",
                                    type: "text",
                                    id: "description",
                                    name: "description",
                                    value: formProps.values.description,
                                    onChange: formProps.handleChange,
                                    onBlur: formProps.handleBlur,
                                }}
                                invalid={Boolean(
                                    formProps.touched.description &&
                                        formProps.errors.description
                                )}
                            />
                            {formProps.touched.description &&
                                formProps.errors.description && (
                                    <InputErrorMessage
                                        message={formProps.errors.description}
                                    />
                                )}
                        </div>
                        <SuccessButton button={{ type: "submit" }}>
                            Add product
                        </SuccessButton>
                    </Form>
                )}
            </Formik>
        </Overlay>
    );
};
export default ProductCreator;
