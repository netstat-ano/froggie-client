import ResponseApi from "./ResponseApi";
import { State as Reactions } from "../hooks/use-like-system";
class Comment {
    UserId?: number;
    id?: number;
    ProductId: number;
    commentText: string;
    confirmedByPurchase?: number;
    createdAt?: Date;
    updatedAt?: Date;
    rate: number;
    constructor(commentText: string, rate: number, ProductId: number) {
        this.rate = rate;
        this.commentText = commentText;
        this.ProductId = ProductId;
    }
    async save(token: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/comment/add-comment`,
            {
                method: "POST",
                body: JSON.stringify({
                    commentText: this.commentText,
                    rate: this.rate,
                    ProductId: this.ProductId,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const resJson = await response.json();
        if (resJson.ok) {
            return {
                comment: resJson.comment as Comment,
                message: "Created succesfully.",
                ok: true,
            };
        }
        return resJson.message as string;
    }
    static async getCommentsByProductId(id: number, sort?: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/comment/fetch-comments`,
            {
                method: "POST",
                body: JSON.stringify({
                    ProductId: id,
                    sort: sort,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const resJson = await response.json();
        if (response.ok) {
            return resJson.comments as Comment[];
        } else {
            return resJson as ResponseApi;
        }
    }
    async update(token: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/comment/update-comment`,
            {
                method: "POST",
                body: JSON.stringify({
                    id: this.id!,
                    commentText: this.commentText,
                    rate: this.rate,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const resJson = await response.json();

        if (resJson.ok) {
            return {
                comment: resJson.comment as Comment,
                message: "Created succesfully.",
                ok: true,
            };
        }
        return resJson.message as string;
    }
    async like(token: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/comment/like-comment`,
            {
                method: "POST",
                body: JSON.stringify({
                    id: this.id!,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const resJson = await response.json();
        if (resJson.ok) {
            return {
                likes: resJson.likes,
                dislikes: resJson.dislikes,
            } as Reactions;
        }
        return resJson.message as string;
    }
    async dislike(token: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/comment/dislike-comment`,
            {
                method: "POST",
                body: JSON.stringify({
                    id: this.id!,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const resJson = await response.json();
        if (resJson.ok) {
            return {
                likes: resJson.likes,
                dislikes: resJson.dislikes,
            } as Reactions;
        }
        return resJson.message as string;
    }
    async delete(token: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/comment/delete-comment`,
            {
                method: "POST",
                body: JSON.stringify({
                    id: this.id!,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const resJson = await response.json();

        return resJson as ResponseApi;
    }
    async fetchReactions() {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/comment/fetch-reactions`,
            {
                method: "POST",
                body: JSON.stringify({
                    id: this.id!,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const resJson = await response.json();

        return {
            likes: resJson.likes,
            dislikes: resJson.dislikes,
        } as Reactions;
    }
}
export default Comment;
