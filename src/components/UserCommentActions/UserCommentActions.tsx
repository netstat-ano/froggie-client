import CanceledButton from "../UI/CanceledButton/CanceledButton";
import SuccessButton from "../UI/SuccessButton/SuccessButton";
import styles from "./UserCommentActions.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comment from "../../models/Comment";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
const UserCommentActions: React.FC<{
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    comment: Comment;
}> = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const onEditHandler = () => {
        props.setComments((prevState) =>
            prevState.filter((comm) => comm.id !== props.comment.id)
        );
        searchParams.set("edit", "true");
        searchParams.set(`commentText`, `${props.comment.commentText}`);
        searchParams.set(`rate`, `${props.comment.rate}`);
        searchParams.set(`id`, `${props.comment.id}`);
        setSearchParams(searchParams);
    };
    const onDeleteHandler = () => {
        props.setComments((prevState) =>
            prevState.filter((comm) => comm.id !== props.comment.id)
        );
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
