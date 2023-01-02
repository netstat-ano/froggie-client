import CommentCreator from "../CommentCreator/CommentCreator";
import { useAppSelector } from "../../hooks/use-app-selector";
import { useEffect, useState } from "react";
import Comment from "../../models/Comment";
import { useParams } from "react-router";
import useLoading from "../../hooks/use-loading";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import Header from "../UI/Header/Header";
import styles from "./Comments.module.scss";
import CommentCard from "../CommentCard/CommentCard";
const Comments: React.FC<{}> = () => {
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
    return (
        <div>
            {token && (
                <CommentCreator
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
            {comments.map((comment) => (
                <CommentCard
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
