import ParsedOrders from "../../interfaces/ParsedOrders";
import OrderItem from "../../models/OrderItem";
import OrderItemCard from "../OrderItemCard/OrderItemCard";
import styles from "./OrderCard.module.scss";
import Overlay from "../UI/Overlay/Overlay";
import { useAppSelector } from "../../hooks/use-app-selector";
import OrderAdminActions from "../OrderAdminActions/OrderAdminActions";
const OrderCard: React.FC<{
    order: ParsedOrders;
    setOrders: React.Dispatch<React.SetStateAction<ParsedOrders[]>>;
}> = (props) => {
    const prices = props.order.items.map((item) => item.price * item.amount);
    const totalPrice = prices.reduce((a, b) => a + b);
    const creationDate = new Date(props.order.items[0].createdAt);
    const type = useAppSelector((state) => state.authentication.type);
    return (
        <Overlay className={styles["order-card"]}>
            <>
                <div className={styles["order-card__header"]}>
                    <h2>Order no. {props.order.orderId}</h2>{" "}
                    <div className={styles["order-card__header__date"]}>
                        {creationDate.toLocaleString([], {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
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
                <div className={styles["order-card__address"]}>
                    <div>Address:</div>
                    <div>
                        <div>
                            {props.order.items[0].customerName}{" "}
                            {props.order.items[0].customerSurname}
                        </div>
                        <div>Grade: {props.order.items[0].grade}</div>
                        <div>
                            {props.order.classroom > 0
                                ? `Delivery to classroom: ${props.order.classroom}`
                                : ""}
                            {props.order.locker > 0
                                ? `Delivery to locker: ${props.order.locker}`
                                : ""}
                        </div>
                    </div>
                </div>
                <div className={styles["order-card__total-price"]}>
                    Total price: ${totalPrice}
                </div>
                {type === "admin" && (
                    <OrderAdminActions
                        setOrders={props.setOrders}
                        order={props.order}
                    />
                )}
            </>
        </Overlay>
    );
};
export default OrderCard;
