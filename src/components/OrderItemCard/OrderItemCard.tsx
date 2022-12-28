import OrderItem from "../../models/OrderItem";
import styles from "./OrderItemCard.module.scss";
import Overlay from "../UI/Overlay/Overlay";
const OrderItemCard: React.FC<{ item: OrderItem }> = (props) => {
    return (
        <div className="center">
            <div className={styles["order-item-card"]}>
                <div>{props.item.name}</div>
                <div>x {props.item.amount}</div>
                <div>{props.item.price * props.item.amount}</div>
            </div>
        </div>
    );
};
export default OrderItemCard;
