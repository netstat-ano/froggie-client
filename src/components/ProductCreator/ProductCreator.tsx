import Overlay from "../UI/Overlay/Overlay";
import styles from "./ProductCreator.module.scss";
import Input from "../UI/Input/Input";
import { FormikErrors, Form, Formik } from "formik";
import InputErrorMessage from "../UI/InputErrorMessage/InputErrorMessage";
import SuccessButton from "../UI/SuccessButton/SuccessButton";
import Textarea from "../UI/Textarea/Textarea";
import React, { useEffect, useState } from "react";
import Product from "../../models/Product";
import { useAppSelector } from "../../hooks/use-app-selector";
import ImagePicker from "../UI/ImagePicker/ImagePicker";
import Category from "../../models/Category";
import CategoryCreator from "../CategoryCreator/CategoryCreator";
import Select from "../UI/Select/Select";
interface FormValues {
    productName: string;
    description: string;
    images: string;
}
const ProductCreator: React.FC<{}> = () => {
    const token = useAppSelector((state) => state.authentication.token);
    const [categories, setCategories] = useState<Category[]>();
    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await Category.getCategories();

            if (categories instanceof Array) {
                setCategories(categories);
            }
        };
        fetchCategories();
    }, []);
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
        if (values.images.length > 8) {
            errors.images = "You must choose less photos (max 8).";
        }
        return errors;
    };
    const onSubmitHandler = (values: FormValues) => {
        const product = new Product(
            values.productName,
            values.description,
            values.images
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
                            <ImagePicker
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
                                    },
                                }}
                                filesAmount={formProps.values.images.length}
                                invalid={Boolean(
                                    formProps.errors.images ||
                                        !formProps.values.images
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
                        <div>
                            <Select
                                className={styles["product-creator__select"]}
                            >
                                <option>TEST lorem ispum</option>
                            </Select>
                            <br />

                            <CategoryCreator
                                setCategories={setCategories}
                                categories={categories}
                            />
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
