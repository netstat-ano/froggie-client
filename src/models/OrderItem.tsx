import Product from "./Product";
class OrderItem extends Product {
    amount: number;
    OrderId: number;
    createdAt: Date;
    customerName: string;
    customerSurname: string;
    postalCode: string;
    city: string;
    address: string;
    completed: number;
    canceled: number;
    constructor(
        name: string,
        description: string,
        price: number,
        imagesURL: string,
        categoryId: number,
        amount: number,
        OrderId: number,
        createdAt: Date,
        customerName: string,
        customerSurname: string,
        postalCode: string,
        city: string,
        address: string,
        completed: number,
        canceled: number
    ) {
        super(name, description, price, imagesURL, categoryId);
        this.amount = amount;
        this.OrderId = OrderId;
        this.createdAt = createdAt;
        this.customerName = customerName;
        this.customerSurname = customerSurname;
        this.postalCode = postalCode;
        this.city = city;
        this.address = address;
        this.completed = completed;
        this.canceled = canceled;
    }
}
export default OrderItem;
