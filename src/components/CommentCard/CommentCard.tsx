import Comment from "../../models/Comment";
import { useEffect, useState } from "react";
import { FetchedUser } from "../../models/User";
import User from "../../models/User";
const CommentCard: React.FC<{
    comment: Comment;
}> = (props) => {
    const [userDetails, setUserDetails] = useState<FetchedUser>();
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
    return (
        <div>
            <div>{props.comment.commentText}</div>
        </div>
    );
};
export default CommentCard;
