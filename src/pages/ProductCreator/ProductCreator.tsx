import Overlay from "../../components/UI/Overlay/Overlay";
import styles from "./ProductCreator.module.scss";
import Input from "../../components/UI/Input/Input";
import { FormikErrors, Form, Formik, FormikHelpers } from "formik";
import InputErrorMessage from "../../components/UI/InputErrorMessage/InputErrorMessage";
import SuccessButton from "../../components/UI/SuccessButton/SuccessButton";
import Textarea from "../../components/UI/Textarea/Textarea";
import React, { useEffect, useMemo, useState } from "react";
import Product from "../../models/Product";
import { useAppSelector } from "../../hooks/use-app-selector";
import ImagePicker from "../../components/UI/ImagePicker/ImagePicker";
import Category from "../../models/Category";
import CategoryCreator from "../../components/CategoryCreator/CategoryCreator";
import Select from "../../components/UI/Select/Select";
import ImagePreview from "../../components/ImagePreview/ImagePreview";
import { useNavigate, useSearchParams } from "react-router-dom";
import CartItem from "../../models/CartItem";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import cart, { cartActions } from "../../store/cart";
import ErrorNotification from "../../components/UI/ErrorNotification/ErrorNotification";
import clearNotification from "../../utils/clearNotification";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import AutoRezisingTextarea from "../../components/UI/AutoResizingTextarea/AutoResizingTextarea";
interface FormValues {
    productName: string;
    description: string;
    images: string;
    price: number;
}
const ProductCreator: React.FC<{}> = () => {
    const token = useAppSelector((state) => state.authentication.token);
    const type = useAppSelector((state) => state.authentication.type);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category>();
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();
    const controller = useMemo(() => new AbortController(), []);
    const signal = useMemo(() => controller.signal, [controller]);
    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await Category.getCategories();

            if (categories instanceof Array) {
                setCategories(categories);
                setSelectedCategory(categories[0]);
            }
        };
        fetchCategories();
    }, []);
    useEffect(() => {
        if (categories instanceof Array) {
            setSelectedCategory(categories[0]);
        }
    }, [categories]);

    useEffect(() => {
        return () => {
            if (controller) {
                controller.abort();
            }
        };
    }, []);
    const onSubmitHandler = async (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => {
        setIsLoading(true);
        const product = new Product(
            values.productName,
            values.description,
            values.price,
            values.images,
            selectedCategory!.id!
        );
        actions.resetForm({
            values: {
                productName: "",
                description: "",
                images: "",
                price: 0,
            },
        });

        if (
            Boolean(searchParams.get("edit")) === true &&
            searchParams.get("id")
        ) {
            await product.update(token, Number(searchParams.get("id")), signal);
            setIsLoading(false);
            navigate(`/product/${searchParams.get("id")}`);
        } else {
            const response = await product.save(token, signal);
            if (response.ok) {
                navigate(`/product/${response.message}`);
            }
            setIsLoading(false);
            if (!response.ok) {
                setServerError(response.message);
                clearNotification(setServerError, 2000);
            }
        }
    };

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
        if (values.price < 0) {
            errors.price = "Price must be greater than 0";
        }
        return errors;
    };

    const onChangeCategoryHandler = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const target = JSON.parse(e.target.value);
        const category = new Category(target.name, target.id);
        setSelectedCategory(category);
    };
    useEffect(() => {
        if (!token || type !== "admin") {
            navigate("/unauthorized");
        }
    }, []);
    return (
        <>
            {isLoading && <LoadingSpinner />}

            {!isLoading && (
                <Overlay className={styles["product-creator"]}>
                    <>
                        {serverError && (
                            <ErrorNotification>{serverError}</ErrorNotification>
                        )}
                        <Formik
                            initialValues={{
                                productName:
                                    searchParams.get("productName") || "",
                                description:
                                    searchParams.get("description") || "",
                                images: "",
                                price: Number(searchParams.get("price")) || 0,
                            }}
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
                                                value: formProps.values
                                                    .productName,
                                                onChange:
                                                    formProps.handleChange,
                                            }}
                                            invalid={Boolean(
                                                formProps.touched.productName &&
                                                    formProps.errors.productName
                                            )}
                                        />
                                        {formProps.touched.productName &&
                                            formProps.errors.productName && (
                                                <InputErrorMessage
                                                    message={
                                                        formProps.errors
                                                            .productName
                                                    }
                                                />
                                            )}
                                    </div>
                                    <div>
                                        <ImagePicker
                                            input={{
                                                accept: "image/png, image/jpeg, image/webp, image/jpg",
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
                                            filesAmount={
                                                formProps.values.images.length
                                            }
                                            invalid={Boolean(
                                                formProps.errors.images ||
                                                    !formProps.values.images
                                            )}
                                        />
                                        {formProps.touched.images &&
                                            formProps.errors.images && (
                                                <InputErrorMessage
                                                    message={
                                                        formProps.errors.images
                                                    }
                                                />
                                            )}
                                        <div
                                            className={`
                                        ${styles["product-creator__img_preview"]}`}
                                        >
                                            {formProps.values.images &&
                                                formProps.values.images.length <
                                                    9 &&
                                                Array.from(
                                                    formProps.values.images
                                                ).map((file, index) => (
                                                    <ImagePreview
                                                        key={index}
                                                        index={index}
                                                        styleFirst={true}
                                                        file={file}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                    <div>
                                        <AutoRezisingTextarea
                                            textarea={{
                                                placeholder: "Description",
                                                type: "text",
                                                id: "description",
                                                name: "description",
                                                value: formProps.values
                                                    .description,
                                                onInput: formProps.handleChange,
                                                onBlur: formProps.handleBlur,
                                            }}
                                            invalid={Boolean(
                                                formProps.touched.description &&
                                                    formProps.errors.description
                                            )}
                                            className={
                                                styles[
                                                    "product-creator__textarea"
                                                ]
                                            }
                                        />
                                        {formProps.touched.description &&
                                            formProps.errors.description && (
                                                <InputErrorMessage
                                                    message={
                                                        formProps.errors
                                                            .description
                                                    }
                                                />
                                            )}
                                    </div>
                                    <div>
                                        <Input
                                            input={{
                                                value: formProps.values.price,
                                                onChange:
                                                    formProps.handleChange,
                                                onBlur: formProps.handleBlur,
                                                type: "number",
                                                name: "price",
                                            }}
                                            invalid={Boolean(
                                                formProps.touched.price &&
                                                    formProps.errors.price
                                            )}
                                        />
                                    </div>
                                    <div>
                                        {categories && (
                                            <Select
                                                select={{
                                                    onChange:
                                                        onChangeCategoryHandler,
                                                }}
                                                className={
                                                    styles[
                                                        "product-creator__select"
                                                    ]
                                                }
                                            >
                                                <>
                                                    {categories.map(
                                                        (category) => (
                                                            <option
                                                                value={JSON.stringify(
                                                                    category
                                                                )}
                                                                key={
                                                                    category.id
                                                                }
                                                            >
                                                                {category.name}
                                                            </option>
                                                        )
                                                    )}
                                                </>
                                            </Select>
                                        )}
                                        <br />

                                        <CategoryCreator
                                            setCategories={setCategories}
                                            categories={categories}
                                        />
                                    </div>

                                    <SuccessButton button={{ type: "submit" }}>
                                        <>
                                            {Boolean(
                                                searchParams.get("edit")
                                            ) === true
                                                ? "Update product"
                                                : "Add product"}
                                        </>
                                    </SuccessButton>
                                </Form>
                            )}
                        </Formik>
                    </>
                </Overlay>
            )}
        </>
    );
};
export default ProductCreator;
