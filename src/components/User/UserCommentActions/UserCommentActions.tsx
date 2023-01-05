import CanceledButton from "../../UI/CanceledButton/CanceledButton";
import SuccessButton from "../../UI/SuccessButton/SuccessButton";
import styles from "./UserCommentActions.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comment from "../../../models/Comment";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/use-app-selector";
import Product from "../../../models/Product";
const UserCommentActions: React.FC<{
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    comment: Comment;
    editingComment: Comment | undefined;
    setEditingComment: React.Dispatch<
        React.SetStateAction<Comment | undefined>
    >;
    setAverageRate: React.Dispatch<React.SetStateAction<string>>;
}> = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { productId } = useParams();
    const token = useAppSelector((state) => state.authentication.token);
    const onEditHandler = () => {
        if (!props.editingComment) {
            props.setEditingComment(props.comment);
            props.setComments((prevState) =>
                prevState.filter((comm) => comm.id !== props.comment.id)
            );
        } else {
            const { editingComment } = props;

            props.setComments((prevState) => [editingComment, ...prevState]);
            props.setComments((prevState) =>
                prevState.filter((comm) => comm.id !== props.comment.id)
            );
            props.setEditingComment(props.comment);
        }
        searchParams.set("edit", "true");
        searchParams.set(`commentText`, `${props.comment.commentText}`);
        searchParams.set(`rate`, `${props.comment.rate}`);
        searchParams.set(`id`, `${props.comment.id}`);
        setSearchParams(searchParams);
    };
    const onDeleteHandler = async () => {
        props.setComments((prevState) =>
            prevState.filter((comm) => comm.id !== props.comment.id)
        );
        const comment = new Comment(
            props.comment.commentText,
            props.comment.rate,
            props.comment.ProductId
        );
        comment.id = props.comment.id;
        await comment.delete(token);
        const rate = await Product.fetchAverageRate(Number(productId));
        if (typeof rate === "string") {
            if (rate !== "null") {
                props.setAverageRate(rate);
            }
        }
    };
    return (
        <div className={styles["user-comment-actions"]}>
            <SuccessButton button={{ onClick: onEditHandler }}>
                <>
                    <FontAwesomeIcon icon={faPenToSquare} /> Edit
                </>
            </SuccessButton>
            <CanceledButton button={{ onClick: onDeleteHandler }}>
                <>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                </>
            </CanceledButton>
        </div>
    );
};
export default UserCommentActions;
