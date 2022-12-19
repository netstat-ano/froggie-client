import Product from "./Product";

class CartItem extends Product {
    amount: number;

    constructor(
        name: string,
        description: string,
        price: number,
        imagesURL: string,
        categoryId: number,
        amount: number
    ) {
        super(name, description, price, imagesURL, categoryId);
        this.amount = amount;
    }
    async addToCart(id: number, token: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/cart/add-product`,
            {
                method: "POST",
                body: JSON.stringify({
                    id: id,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const resJson = response.json();
        return resJson;
    }
}
export default CartItem;
