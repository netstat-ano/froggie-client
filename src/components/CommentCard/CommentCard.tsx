import Comment from "../../models/Comment";
import { useCallback, useEffect, useState } from "react";
import { FetchedUser } from "../../models/User";
import User from "../../models/User";
import styles from "./CommentCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faStar,
    faThumbsUp,
    faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../hooks/use-app-selector";
import UserCommentActions from "../UserCommentActions/UserCommentActions";
import useLikeSystem from "../../hooks/use-like-system";
const CommentCard: React.FC<{
    comment: Comment;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    editingComment: Comment | undefined;
    setEditingComment: React.Dispatch<
        React.SetStateAction<Comment | undefined>
    >;
    setAverageRate: React.Dispatch<React.SetStateAction<string>>;
}> = (props) => {
    const [reactions, dispatchReactions] = useLikeSystem();
    const [userDetails, setUserDetails] = useState<FetchedUser>();
    const [likeStatus, setLikeStatus] = useState("");
    const token = useAppSelector((state) => state.authentication.token);
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

        const fetchReactions = async () => {
            const comment = new Comment(
                props.comment.commentText,
                props.comment.rate,
                props.comment.ProductId
            );
            comment.id = props.comment.id;
            const data = await comment.fetchReactions();
            console.log(data);

            const isLiked = await comment.checkLikeStatus(token);
            setLikeStatus(isLiked.status);

            dispatchReactions({
                type: "INIT",
                data: { likes: data.likes, dislikes: data.dislikes },
            });
        };
        fetchReactions();
        fetchUserDetails();
    }, []);
    const onLikeHandler = async () => {
        if (token) {
            const comment = new Comment(
                props.comment.commentText,
                props.comment.rate,
                props.comment.ProductId
            );
            comment.id = props.comment.id;
            if (likeStatus === "like") {
                setLikeStatus("none");
            } else {
                setLikeStatus("like");
            }
            const data = await comment.like(token);
            if (typeof data !== "string") {
                dispatchReactions({
                    type: "INIT",
                    data: { likes: data.likes, dislikes: data.dislikes },
                });
            }
        }
    };
    const onDislikeHandler = async () => {
        if (token) {
            const comment = new Comment(
                props.comment.commentText,
                props.comment.rate,
                props.comment.ProductId
            );
            comment.id = props.comment.id;
            if (likeStatus === "dislike") {
                setLikeStatus("none");
            } else {
                setLikeStatus("dislike");
            }
            const data = await comment.dislike(token);
            if (typeof data !== "string") {
                dispatchReactions({
                    type: "INIT",
                    data: { likes: data.likes, dislikes: data.dislikes },
                });
            }
        }
    };
    const visualizeRating = useCallback(() => {
        const rating: JSX.Element[] = [];
        for (let i = 0; i < props.comment.rate; i++) {
            rating.push(
                <FontAwesomeIcon
                    className={`${styles["star-gold"]} ${styles["star"]}`}
                    icon={faStar}
                />
            );
        }
        for (let i = 5 - props.comment.rate; i > 0; i--) {
            rating.push(
                <FontAwesomeIcon
                    className={`${styles["star-black"]} ${styles["star"]}`}
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
            <div className={styles["comment-card__rate-actions__container"]}>
                <div>{rate.map((star) => star)}</div>
                {Number(userId) === props.comment.UserId && (
                    <UserCommentActions
                        setAverageRate={props.setAverageRate}
                        setEditingComment={props.setEditingComment}
                        editingComment={props.editingComment}
                        comment={props.comment}
                        setComments={props.setComments}
                    />
                )}
            </div>
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
            <div className={styles["comment-card__comment-actions"]}>
                <div
                    onClick={onLikeHandler}
                    className={`
                        ${styles["comment-card__comment-actions__thumbs-up"]} ${
                        likeStatus === "like" && styles["liked"]
                    }`}
                >
                    <FontAwesomeIcon icon={faThumbsUp} />
                    {reactions.likes}
                </div>
                <div
                    onClick={onDislikeHandler}
                    className={`
                        ${
                            styles["comment-card__comment-actions__thumbs-down"]
                        } ${likeStatus === "dislike" && styles["disliked"]}`}
                >
                    <FontAwesomeIcon icon={faThumbsDown} />
                    {reactions.dislikes}
                </div>
            </div>
        </div>
    );
};
export default CommentCard;
