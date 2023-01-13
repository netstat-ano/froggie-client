import DeliveryOptions from "../../components/DeliveryOptions/DeliveryOptions";
import Overlay from "../../components/UI/Overlay/Overlay";
import styles from "./Delivery.module.scss";
const Delivery: React.FC<{}> = () => {
    return (
        <div className={`center ${styles["delivery"]}`}>
            <Overlay>
                <>
                    <DeliveryOptions />
                </>
            </Overlay>
        </div>
    );
};
export default Delivery;
