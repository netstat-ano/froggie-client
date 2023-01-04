import { useReducer } from "react";
export interface State {
    likes: number;
    dislikes: number;
}
type Action =
    | { type: "RESET" }
    | { type: "INIT"; data: State }
    | { type: "INCREMENT_LIKES" }
    | { type: "DECREMENT_LIKES" }
    | { type: "INCREMENT_DISLIKES" }
    | { type: "DECREMENT_DISLIKES" };
const useLikeSystem = (): [State, React.Dispatch<Action>] => {
    const likesReducer = (state: State, action: Action) => {
        if (action.type === "RESET") {
            return {
                likes: 0,
                dislikes: 0,
            };
        } else if (action.type === "INIT") {
            return action.data;
        } else if (action.type === "INCREMENT_LIKES") {
            return {
                likes: state.likes + 1,
                dislikes: state.dislikes,
            };
        } else if (action.type === "DECREMENT_LIKES") {
            return {
                likes: state.likes - 1,
                dislikes: state.dislikes,
            };
        } else if (action.type === "INCREMENT_DISLIKES") {
            return {
                likes: state.likes,
                dislikes: state.dislikes + 1,
            };
        } else if (action.type === "DECREMENT_DISLIKES") {
            return {
                likes: state.likes,
                dislikes: state.dislikes - 1,
            };
        }
        return state;
    };
    const [likes, dispatchLikes] = useReducer(likesReducer, {
        likes: 0,
        dislikes: 0,
    });
    return [likes, dispatchLikes];
};
export default useLikeSystem;
