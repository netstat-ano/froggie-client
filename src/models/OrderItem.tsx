import Product from "./Product";
class OrderItem extends Product {
    amount: number;
    OrderId: number;
    createdAt: Date;
    constructor(
        name: string,
        description: string,
        price: number,
        imagesURL: string,
        categoryId: number,
        amount: number,
        OrderId: number,
        createdAt: Date
    ) {
        super(name, description, price, imagesURL, categoryId);
        this.amount = amount;
        this.OrderId = OrderId;
        this.createdAt = createdAt;
    }
}
export default OrderItem;
