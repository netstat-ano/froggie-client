import OrderForm from "../../components/OrderForm/OrderForm";
import Overlay from "../../components/UI/Overlay/Overlay";
const Order: React.FC<{}> = () => {
    return (
        <div className="center">
            <Overlay>
                <OrderForm />
            </Overlay>
        </div>
    );
};
export default Order;
