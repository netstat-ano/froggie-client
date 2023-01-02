import ResponseApi from "./ResponseApi";

class Comment {
    UserId?: number;
    id?: number;
    ProductId: number;
    commentText: string;
    confirmedByPurchase?: number;
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
    static async getCommentsByProductId(id: number) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/comment/fetch-comments`,
            {
                method: "POST",
                body: JSON.stringify({
                    ProductId: id,
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
}
export default Comment;
