import ResponseApi from "./ResponseApi";

class Category {
    id?: number;
    name: string;
    constructor(name: string, id?: number) {
        this.name = name;
        this.id = id;
    }
    async save(token: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/category/add-category`,
            {
                method: "POST",
                body: JSON.stringify({
                    name: this.name,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.ok) {
            const resJson = await response.json();
            const returnedCategory = new Category(
                resJson.category.name,
                resJson.category.id
            );

            return returnedCategory as Category;
        }
        const resJson = await response.json();
        return resJson as ResponseApi;
    }
    static async getCategories() {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/category/fetch-categories`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const resJson = await response.json();

        if (response.ok) {
            return resJson.categories as Category[];
        }
        return resJson as ResponseApi;
    }
    async delete(token: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/category/delete-category`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id: this.id }),
            }
        );
        const resJson = await response.json();
        return resJson as ResponseApi;
    }
}
export default Category;
