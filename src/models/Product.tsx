import ResponseApi from "./ResponseApi";

class Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    imagesURL: any;
    CategoryId: number;

    constructor(
        name: string,
        description: string,
        price: number,
        imagesURL: any,
        CategoryId: number
    ) {
        this.name = name;
        this.description = description;
        this.imagesURL = imagesURL;
        this.CategoryId = CategoryId;
        this.price = price;
    }
    async save(token: string, signal?: AbortSignal) {
        const data = new FormData();
        data.append("productName", this.name);
        data.append("description", this.description);
        data.append("price", String(this.price));
        data.append("categoryId", String(this.CategoryId));
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
                signal: signal,
            }
        );
        const resJson = await response.json();
        console.log(resJson);

        return resJson as ResponseApi;
    }
    static async delete(id: number, token: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/product/delete-product`,
            {
                method: "POST",
                body: JSON.stringify({
                    id: id,
                }),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const resJson = await response.json();
        console.log(resJson);

        return resJson as ResponseApi;
    }
    static async getProductByCategory(id: string, sort?: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/product/fetch-product-by-category`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ categoryId: id, sort }),
            }
        );
        if (response.ok) {
            const resJson = (await response.json()) as Product[];
            return resJson;
        } else {
            const resJson = await response.json();
            return resJson as ResponseApi;
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
    async update(token: string, id: number, signal?: AbortSignal) {
        const data = new FormData();
        data.append("ProductId", String(id));
        data.append("productName", this.name);
        data.append("description", this.description);
        data.append("price", String(this.price));
        data.append("CategoryId", String(this.CategoryId));
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
                signal: signal,
            }
        );
        const resJson = await response.json();

        return resJson as ResponseApi;
    }
    static async fetchAverageRate(id: number) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/product/fetch-average-rate`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ProductId: id }),
            }
        );
        const resJson = await response.json();

        if (resJson.ok) {
            return resJson.rate as string;
        } else {
            return resJson as ResponseApi;
        }
    }
}
export default Product;
