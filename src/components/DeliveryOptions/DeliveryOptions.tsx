import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDoorClosed,
    faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import styles from "./DeliveryOptions.module.scss";
import Header from "../UI/Header/Header";
import { useState } from "react";
import DeliveryForm from "../DeliveryForm/DeliveryForm";
const DeliveryOptions: React.FC<{}> = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [deliveryType, setDeliveryType] = useState<string>();
    const onClassroomDeliveryHandler = () => {
        setDeliveryType("classroom");
    };
    const onLockerDeliveryHandler = () => {
        setDeliveryType("locker");
    };
    return (
        <div className={styles["delivery-options"]}>
            <div className="center">
                <Header>Choose delivery options</Header>
            </div>
            <div className={styles["delivery-options__options"]}>
                <div
                    className={`center-column ${
                        styles["delivery-options__options__classroom"]
                    } ${
                        deliveryType === "classroom"
                            ? styles["delivery-options__options__active"]
                            : ""
                    }`}
                    onClick={onClassroomDeliveryHandler}
                >
                    <div>To the classroom</div>
                    <div>
                        <FontAwesomeIcon
                            className={
                                styles["delivery-options__options__icon"]
                            }
                            icon={faGraduationCap}
                        />
                    </div>
                </div>
                <div
                    className={`center-column ${
                        styles["delivery-options__options__locker"]
                    } ${
                        deliveryType === "locker"
                            ? styles["delivery-options__options__active"]
                            : ""
                    }`}
                    onClick={onLockerDeliveryHandler}
                >
                    <div>To the locker</div>
                    <div>
                        <FontAwesomeIcon
                            className={
                                styles["delivery-options__options__icon"]
                            }
                            icon={faDoorClosed}
                        />
                    </div>
                </div>
            </div>
            <DeliveryForm type={deliveryType} />
        </div>
    );
};
export default DeliveryOptions;
