import Error from "./Error";

class Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    imagesURL: any;
    categoryId: number;

    constructor(
        name: string,
        description: string,
        price: number,
        imagesURL: any,
        categoryId: number
    ) {
        this.name = name;
        this.description = description;
        this.imagesURL = imagesURL;
        this.categoryId = categoryId;
        this.price = price;
    }
    async save(token: string) {
        const data = new FormData();
        data.append("productName", this.name);
        data.append("description", this.description);
        data.append("price", String(this.price));
        data.append("categoryId", String(this.categoryId));
        for (let i = 0; i < this.imagesURL.length; i++) {
            data.append("images", this.imagesURL[i]);
        }

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/product/create-product`,
            {
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const resJson = response.json();
        return resJson;
    }
    static async getProducts() {
        const response = await fetch(
            `${process.env.API_URL}/product/fetch-products`,
            {
                method: "POST",
            }
        );
        const resJson = response.json();
        return resJson;
    }
    static async getProductByCategory(id: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/product/fetch-product-by-category`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ categoryId: id }),
            }
        );
        if (response.ok) {
            const resJson = (await response.json()) as Product[];
            return resJson;
        } else {
            const resJson = await response.json();
            const messageError = new Error(resJson.message);
            return messageError;
        }
    }
    static async getProductByPk(id: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/product/fetch-product-by-pk`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: id }),
            }
        );
        const resJson = await response.json();

        if (resJson.ok) {
            return resJson.product as Product;
        } else {
            return resJson.message as string;
        }
    }
    async update(token: string, id: number) {
        const data = new FormData();
        data.append("ProductId", String(id));
        data.append("productName", this.name);
        data.append("description", this.description);
        data.append("price", String(this.price));
        data.append("CategoryId", String(this.categoryId));
        for (let i = 0; i < this.imagesURL.length; i++) {
            data.append("images", this.imagesURL[i]);
        }
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/product/update-product`,
            {
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const resJson = await response.json();

        if (resJson.ok) {
            return resJson;
        } else {
            const errorMessage = new Error(resJson.message);
            return errorMessage as Error;
        }
    }
}
export default Product;
