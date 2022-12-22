import ParsedOrders from "../../interfaces/ParsedOrders";
import OrderItem from "../../models/OrderItem";
import OrderItemCard from "../OrderItemCard/OrderItemCard";
import styles from "./OrderCard.module.scss";
const OrderCard: React.FC<{
    order: ParsedOrders;
}> = (props) => {
    const prices = props.order.items.map((item) => item.price * item.amount);
    const totalPrice = prices.reduce((a, b) => a + b);
    return (
        <>
            <div className={styles["order-card__header"]}>
                <h2>Order no. {props.order.orderId}</h2>
            </div>
            {props.order.items.map((item) => (
                <OrderItemCard item={item} key={item.id} />
            ))}
            <div>{totalPrice}</div>
        </>
    );
};
export default OrderCard;
