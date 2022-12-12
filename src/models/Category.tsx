class Category {
    id?: number;
    name: string;
    constructor(name: string, id?: number) {
        this.name = name;
        this.id = id;
    }
    async save(token: string) {
        const response = await fetch(
            "http://localhost:8080/category/add-category",
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
    }
    static async getCategories() {
        const response = await fetch(
            "http://localhost:8080/category/fetch-categories",
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
        return resJson as Error;
    }
    async delete(token: string) {
        const response = await fetch(
            "http://localhost:8080/category/delete-category",
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
        if (response.ok) {
            return {};
        }
        return resJson as Error;
    }
}
export default Category;
