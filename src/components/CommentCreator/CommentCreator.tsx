import SuccessButton from "../UI/SuccessButton/SuccessButton";
import Textarea from "../UI/Textarea/Textarea";
import styles from "./CommentCreator.module.scss";
import { Formik, FormikErrors, FormikHelpers, useFormik } from "formik";
import AutoRezisingTextarea from "../UI/AutoResizingTextarea/AutoResizingTextarea";
import RatingStars from "../UI/RatingStars/RatingStars";
import InputErrorMessage from "../UI/InputErrorMessage/InputErrorMessage";
import React, { useCallback, useState, useEffect } from "react";
import Comment from "../../models/Comment";
import { useAppSelector } from "../../hooks/use-app-selector";
import useServerError from "../../hooks/use-server-error";
import ErrorNotification from "../UI/ErrorNotification/ErrorNotification";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import Order from "../../models/Order";
import Product from "../../models/Product";
interface FormValues {
    commentText: string;
    toggledStars: number;
}
const CommentCreator: React.FC<{
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    editingComment: Comment | undefined;
    setEditingComment: React.Dispatch<
        React.SetStateAction<Comment | undefined>
    >;
    setAverageRate: React.Dispatch<React.SetStateAction<string>>;
}> = (props) => {
    const [toggledStars, setToggledStars] = useState<number>(0);
    const token = useAppSelector((state) => state.authentication.token);
    const userId = useAppSelector((state) => state.authentication.userId);
    const [serverError, setServerError, stop] = useServerError(2000);
    const { productId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const onSubmitHandler = async (values: FormValues) => {
        const comment = new Comment(
            values.commentText,
            toggledStars,
            Number(productId)
        );

        if (
            searchParams.get("edit") &&
            searchParams.get("commentText") &&
            searchParams.get("rate") &&
            searchParams.get("id")
        ) {
            comment.id = Number(searchParams.get("id"));
            var response = await comment.update(token);
            props.setEditingComment(undefined);
            setSearchParams("");
        } else {
            var response = await comment.save(token);
        }
        if (typeof response === "string") {
            setServerError(response);
            stop();
            return;
        } else {
            var fetchedComment = response.comment;
        }
        const check = await Order.checkIfUserPurchaseProduct(
            token,
            Number(productId)
        );
        formik.resetForm();
        fetchedComment.UserId = Number(userId);
        fetchedComment.confirmedByPurchase = check;

        props.setComments((prevState) => [fetchedComment, ...prevState]);
        const rate = await Product.fetchAverageRate(Number(productId));
        if (typeof rate === "string") {
            if (rate !== "null") {
                props.setAverageRate(rate);
            }
        }
    };
    const onValidationHandler = (values: FormValues) => {
        const errors: FormikErrors<FormValues> = {};
        if (values.commentText.trim().length < 8) {
            errors.commentText =
                "Your comment must contain more than 8 characters.";
        }
        if (toggledStars === 0) {
            errors.toggledStars = "Rating is required.";
        }
        return errors;
    };
    const formik = useFormik({
        initialValues: { commentText: "", toggledStars: toggledStars },
        onSubmit: onSubmitHandler,
        validate: onValidationHandler,
        onReset: (values) => {
            values.commentText = "";
            setToggledStars(0);
            values.toggledStars = 0;
        },
    });
    useEffect(() => {
        if (
            searchParams.get("edit") &&
            searchParams.get("commentText") &&
            searchParams.get("rate") &&
            searchParams.get("id")
        ) {
            setToggledStars(Number(searchParams.get("rate")));
            formik.setFieldValue(
                "commentText",
                searchParams.get("commentText")
            );
        }
    }, [searchParams]);

    return (
        <form onSubmit={formik.handleSubmit}>
            {serverError && (
                <ErrorNotification className={styles["comment-creator__error"]}>
                    {serverError}
                </ErrorNotification>
            )}
            <div className={styles["comment-creator"]}>
                <div className={styles["comment-creator__rating"]}>
                    <RatingStars
                        toggledStars={toggledStars}
                        setToggledStars={setToggledStars}
                    />
                    <div className={styles["comment-creator__rating-error"]}>
                        {formik.errors.toggledStars &&
                            formik.touched.toggledStars && (
                                <InputErrorMessage
                                    className={
                                        styles["comment-creator__input-error"]
                                    }
                                    message={formik.errors.toggledStars}
                                />
                            )}
                    </div>
                </div>
                <div>Avatar</div>
                <div>
                    <AutoRezisingTextarea
                        textarea={{
                            onInput: formik.handleChange,
                            value: formik.values.commentText,
                            onBlur: formik.handleBlur,
                            placeholder: "Comment",
                            id: "commentText",
                        }}
                        invalid={Boolean(
                            formik.errors.commentText &&
                                formik.touched.commentText
                        )}
                    />
                    {formik.errors.commentText &&
                        formik.touched.commentText && (
                            <InputErrorMessage
                                className={
                                    styles["comment-creator__input-error"]
                                }
                                message={formik.errors.commentText}
                            />
                        )}
                </div>
                <div className={styles["comment-creator__add-btn"]}>
                    <SuccessButton button={{ type: "submit" }}>
                        {searchParams.get("edit")
                            ? "Update comment"
                            : "Add comment"}
                    </SuccessButton>
                </div>
            </div>
        </form>
    );
};
export default CommentCreator;
