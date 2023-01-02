import Comment from "../../models/Comment";
import { useCallback, useEffect, useState } from "react";
import { FetchedUser } from "../../models/User";
import User from "../../models/User";
import styles from "./CommentCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../hooks/use-app-selector";
import UserCommentActions from "../UserCommentActions/UserCommentActions";
const CommentCard: React.FC<{
    comment: Comment;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    editingComment: Comment | undefined;
    setEditingComment: React.Dispatch<
        React.SetStateAction<Comment | undefined>
    >;
}> = (props) => {
    const [userDetails, setUserDetails] = useState<FetchedUser>();
    const userId = useAppSelector((state) => state.authentication.userId);
    useEffect(() => {
        const fetchUserDetails = async () => {
            if (props.comment.UserId) {
                const user = await User.getDetails(props.comment.UserId!);
                if (user instanceof Object) {
                    setUserDetails(user);
                }
            }
        };
        fetchUserDetails();
    }, [props.comment]);
    const visualizeRating = useCallback(() => {
        const rating: JSX.Element[] = [];
        for (let i = 0; i < props.comment.rate; i++) {
            rating.push(
                <FontAwesomeIcon
                    className={styles["star-gold"]}
                    icon={faStar}
                />
            );
        }
        for (let i = 5 - props.comment.rate; i > 0; i--) {
            rating.push(
                <FontAwesomeIcon
                    className={styles["star-black"]}
                    icon={faStar}
                />
            );
        }
        return rating;
    }, [props.comment.rate]);
    const rate = visualizeRating();
    return (
        <div className={styles["comment-card"]}>
            <div className={styles["comment-card__username"]}>
                {userDetails?.username}
            </div>
            <div>{rate.map((star) => star)}</div>
            <div className={styles["comment-card__confirmed"]}>
                {props.comment.confirmedByPurchase === 0 ? (
                    ""
                ) : (
                    <FontAwesomeIcon icon={faCheck} />
                )}
                {props.comment.confirmedByPurchase === 1 &&
                    " Confirmed by purchase"}
            </div>

            <div className={styles["comment-card__comment-text"]}>
                {props.comment.commentText}
            </div>
            {Number(userId) === props.comment.UserId && (
                <UserCommentActions
                    setEditingComment={props.setEditingComment}
                    editingComment={props.editingComment}
                    comment={props.comment}
                    setComments={props.setComments}
                />
            )}
        </div>
    );
};
export default CommentCard;
