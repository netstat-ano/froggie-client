import Product from "./Product";
class OrderItem extends Product {
    amount: number;
    OrderId: number;
    constructor(
        name: string,
        description: string,
        price: number,
        imagesURL: string,
        categoryId: number,
        amount: number,
        OrderId: number
    ) {
        super(name, description, price, imagesURL, categoryId);
        this.amount = amount;
        this.OrderId = OrderId;
    }
}
export default OrderItem;
