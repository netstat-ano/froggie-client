import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faCircleXmark,
    faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./OrderAdminActions.module.scss";
import ParsedOrders from "../../interfaces/ParsedOrders";
import Order from "../../models/Order";
import { useAppSelector } from "../../hooks/use-app-selector";
const OrderAdminActions: React.FC<{
    order: ParsedOrders;
    setOrders: React.Dispatch<React.SetStateAction<ParsedOrders[]>>;
}> = (props) => {
    const token = useAppSelector((state) => state.authentication.token);
    const onCompleteOrderHandler = async () => {
        if (!props.order.completed) {
            const result = await Order.completeOrder(
                props.order.orderId,
                token
            );
            if (result.ok) {
                props.setOrders((prevState) =>
                    prevState.filter(
                        (order) => order.orderId !== props.order.orderId
                    )
                );
            }
        }
    };
    const onCancelOrderHandler = async () => {
        if (!props.order.canceled) {
            const result = await Order.cancelOrder(props.order.orderId, token);
            if (result.ok) {
                props.setOrders((prevState) =>
                    prevState.filter(
                        (order) => order.orderId !== props.order.orderId
                    )
                );
            }
        }
    };
    const onUncompleteOrderHandler = async () => {
        if (props.order.canceled || props.order.completed) {
            const result = await Order.uncompleteOrder(
                props.order.orderId,
                token
            );
            if (result.ok) {
                props.setOrders((prevState) =>
                    prevState.filter(
                        (order) => order.orderId !== props.order.orderId
                    )
                );
            }
        }
    };
    return (
        <div className={`center ${styles["order-admin-actions"]}`}>
            <div className={styles["order-admin-actions__check"]}>
                <FontAwesomeIcon
                    onClick={onCompleteOrderHandler}
                    icon={faCircleCheck}
                />
            </div>
            <div className={styles["order-admin-actions__box-opened"]}>
                <FontAwesomeIcon
                    onClick={onUncompleteOrderHandler}
                    icon={faBoxOpen}
                />
            </div>
            <div className={styles["order-admin-actions__cancel"]}>
                <FontAwesomeIcon
                    onClick={onCancelOrderHandler}
                    icon={faCircleXmark}
                />
            </div>
        </div>
    );
};
export default OrderAdminActions;
