import Product from "./Product";
class OrderItem extends Product {
    amount: number;
    OrderId: number;
    createdAt: Date;
    customerName: string;
    customerSurname: string;
    grade: string;
    completed: number;
    canceled: number;
    locker: number;
    classroom: number;
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
        grade: string,
        completed: number,
        canceled: number,
        locker: number,
        classroom: number
    ) {
        super(name, description, price, imagesURL, categoryId);
        this.amount = amount;
        this.OrderId = OrderId;
        this.createdAt = createdAt;
        this.customerName = customerName;
        this.customerSurname = customerSurname;
        this.grade = grade;
        this.completed = completed;
        this.canceled = canceled;
        this.locker = locker;
        this.classroom = classroom;
    }
}
export default OrderItem;
