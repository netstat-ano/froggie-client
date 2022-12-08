class Product {
    productName: string;
    description: string;
    images: any;

    constructor(productName: string, description: string, images: any) {
        this.productName = productName;
        this.description = description;
        this.images = images;
    }
    async save(token: string) {
        const data = new FormData();
        data.append("productName", this.productName);
        data.append("description", this.description);
        for (let i = 0; i < this.images.length; i++) {
            data.append("images", this.images[i]);
        }

        const response = await fetch(
            "http://localhost:8080/product/create-product",
            {
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    }
}
export default Product;
