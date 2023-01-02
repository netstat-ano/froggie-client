import SuccessButton from "../UI/SuccessButton/SuccessButton";
import Textarea from "../UI/Textarea/Textarea";
import styles from "./CommentCreator.module.scss";
import { Formik, FormikErrors } from "formik";
import AutoRezisingTextarea from "../UI/AutoResizingTextarea/AutoResizingTextarea";
import RatingStars from "../UI/RatingStars/RatingStars";
import InputErrorMessage from "../UI/InputErrorMessage/InputErrorMessage";
import React, { useState } from "react";
import Comment from "../../models/Comment";
import { useAppSelector } from "../../hooks/use-app-selector";
import useServerError from "../../hooks/use-server-error";
import ErrorNotification from "../UI/ErrorNotification/ErrorNotification";
import { useParams } from "react-router";
import Order from "../../models/Order";
interface FormValues {
    commentText: string;
    toggledStars: number;
}
const CommentCreator: React.FC<{
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}> = (props) => {
    const [toggledStars, setToggledStars] = useState<number>(0);
    const token = useAppSelector((state) => state.authentication.token);
    const userId = useAppSelector((state) => state.authentication.userId);
    const [serverError, setServerError, stop] = useServerError(2000);
    const { productId } = useParams();
    const onSubmitHandler = async (values: FormValues) => {
        const comment = new Comment(
            values.commentText,
            toggledStars,
            Number(productId)
        );
        const response = await comment.save(token);
        if (!response.ok) {
            setServerError(response.message);
            stop();
            return;
        }
        const check = await Order.checkIfUserPurchaseProduct(
            token,
            Number(productId)
        );

        comment.UserId = Number(userId);
        comment.confirmedByPurchase = check;
        props.setComments((prevState) => [comment, ...prevState]);
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
    return (
        <Formik
            validate={onValidationHandler}
            onSubmit={onSubmitHandler}
            initialValues={{ commentText: "", toggledStars: toggledStars }}
        >
            {(formProps) => (
                <form onSubmit={formProps.handleSubmit}>
                    {serverError && (
                        <ErrorNotification
                            className={styles["comment-creator__error"]}
                        >
                            {serverError}
                        </ErrorNotification>
                    )}
                    <div className={styles["comment-creator"]}>
                        <div className={styles["comment-creator__rating"]}>
                            <RatingStars
                                toggledStars={toggledStars}
                                setToggledStars={setToggledStars}
                            />
                            <div
                                className={
                                    styles["comment-creator__rating-error"]
                                }
                            >
                                {formProps.errors.toggledStars &&
                                    formProps.touched.toggledStars && (
                                        <InputErrorMessage
                                            className={
                                                styles[
                                                    "comment-creator__input-error"
                                                ]
                                            }
                                            message={
                                                formProps.errors.toggledStars
                                            }
                                        />
                                    )}
                            </div>
                        </div>
                        <div>Avatar</div>
                        <div>
                            <AutoRezisingTextarea
                                textarea={{
                                    onInput: formProps.handleChange,
                                    value: formProps.values.commentText,
                                    onBlur: formProps.handleBlur,
                                    placeholder: "Comment",
                                    id: "commentText",
                                }}
                                invalid={Boolean(
                                    formProps.errors.commentText &&
                                        formProps.touched.commentText
                                )}
                            />
                            {formProps.errors.commentText &&
                                formProps.touched.commentText && (
                                    <InputErrorMessage
                                        className={
                                            styles[
                                                "comment-creator__input-error"
                                            ]
                                        }
                                        message={formProps.errors.commentText}
                                    />
                                )}
                        </div>
                        <div className={styles["comment-creator__add-btn"]}>
                            <SuccessButton button={{ type: "submit" }}>
                                Add comment
                            </SuccessButton>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
};
export default CommentCreator;
