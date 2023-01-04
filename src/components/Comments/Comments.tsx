import CommentCreator from "../CommentCreator/CommentCreator";
import { useAppSelector } from "../../hooks/use-app-selector";
import React, { useEffect, useState } from "react";
import Comment from "../../models/Comment";
import { useParams } from "react-router";
import useLoading from "../../hooks/use-loading";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import Header from "../UI/Header/Header";
import styles from "./Comments.module.scss";
import CommentCard from "../CommentCard/CommentCard";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import Select from "../UI/Select/Select";
const Comments: React.FC<{
    setAverageRate: React.Dispatch<React.SetStateAction<string>>;
}> = (props) => {
    const token = useAppSelector((state) => state.authentication.token);
    const { productId } = useParams();
    const [editingComment, setEditingComment] = useState<Comment>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [serverMessage, setServerMessage] = useState("");
    const [isLoading, stop] = useLoading();
    useEffect(() => {
        const fetchComments = async () => {
            const response = await Comment.getCommentsByProductId(
                Number(productId)
            );
            stop();
            if (response instanceof Array) {
                setComments(response);
            } else {
                setServerMessage(response.message);
            }
        };

        fetchComments();
    }, [productId]);
    const onSortHandler = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "Sort by oldest") {
            var response = await Comment.getCommentsByProductId(
                Number(productId),
                "OLDEST"
            );
        } else if (e.target.value === "Sort by newest") {
            var response = await Comment.getCommentsByProductId(
                Number(productId),
                "NEWEST"
            );
        } else if (e.target.value === "Sort by likes ascending") {
            var response = await Comment.getCommentsByProductId(
                Number(productId),
                "LIKES ASC"
            );
        } else if (e.target.value === "Sort by likes descending") {
            var response = await Comment.getCommentsByProductId(
                Number(productId),
                "LIKES DESC"
            );
        } else if (e.target.value === "Sort by dislikes ascending") {
            var response = await Comment.getCommentsByProductId(
                Number(productId),
                "DISLIKES ASC"
            );
        } else if (e.target.value === "Sort by dislikes descending") {
            var response = await Comment.getCommentsByProductId(
                Number(productId),
                "DISLIKES DESC"
            );
        } else {
            var response = await Comment.getCommentsByProductId(
                Number(productId)
            );
        }

        if (response instanceof Array) {
            setComments(response);
        } else {
            setServerMessage(response.message);
        }
    };
    return (
        <div>
            {token && (
                <CommentCreator
                    setAverageRate={props.setAverageRate}
                    editingComment={editingComment}
                    setEditingComment={setEditingComment}
                    setComments={setComments}
                />
            )}
            {isLoading && <LoadingSpinner />}
            {serverMessage && comments.length === 0 && (
                <Header className={styles["comments__header"]}>
                    {serverMessage}
                </Header>
            )}
            {comments.length > 0 && (
                <Select select={{ onChange: onSortHandler }}>
                    <>
                        <option>Default</option>
                        <option>Sort by newest</option>
                        <option>Sort by oldest</option>
                        <option>Sort by likes ascending</option>
                        <option>Sort by likes descending</option>
                        <option>Sort by dislikes ascending</option>
                        <option>Sort by dislikes descending</option>
                    </>
                </Select>
            )}
            {comments.map((comment) => (
                <CommentCard
                    key={comment.id}
                    setAverageRate={props.setAverageRate}
                    editingComment={editingComment}
                    setEditingComment={setEditingComment}
                    comment={comment}
                    setComments={setComments}
                />
            ))}
        </div>
    );
};
export default Comments;
