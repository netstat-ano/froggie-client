import ParsedOrders from "../../interfaces/ParsedOrders";
import OrderItem from "../../models/OrderItem";
import OrderItemCard from "../OrderItemCard/OrderItemCard";
import styles from "./OrderCard.module.scss";
import Overlay from "../UI/Overlay/Overlay";
const OrderCard: React.FC<{
    order: ParsedOrders;
}> = (props) => {
    const prices = props.order.items.map((item) => item.price * item.amount);
    const totalPrice = prices.reduce((a, b) => a + b);
    const creationDate = new Date(props.order.items[0].createdAt);
    return (
        <Overlay className={styles["order-card"]}>
            <>
                <div className={styles["order-card__header"]}>
                    <h2>Order no. {props.order.orderId}</h2>{" "}
                    <span>
                        {creationDate.toLocaleString([], {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                </div>
                <div className="center">
                    <div
                        className={`${styles["order-card__column-names"]} flex-row space-between`}
                    >
                        <div>Name</div>
                        <div>Amount</div>
                        <div>Price</div>
                    </div>
                </div>
                {props.order.items.map((item) => (
                    <OrderItemCard item={item} key={item.id} />
                ))}
                <div className={styles["order-card__total-price"]}>
                    Total price: ${totalPrice}
                </div>
            </>
        </Overlay>
    );
};
export default OrderCard;
