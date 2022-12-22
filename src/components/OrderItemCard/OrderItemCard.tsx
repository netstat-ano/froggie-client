import OrderItem from "../../models/OrderItem";
const OrderItemCard: React.FC<{ item: OrderItem }> = (props) => {
    return (
        <div>
            <div>{props.item.name}</div>
            <div>x {props.item.amount}</div>
            <div>{props.item.price * props.item.amount}</div>
        </div>
    );
};
export default OrderItemCard;
