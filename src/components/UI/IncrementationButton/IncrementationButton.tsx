import { useState } from "react";
import SuccessButton from "../SuccessButton/SuccessButton";
import styles from "./IncrementationButton.module.scss";
import CanceledButton from "../CanceledButton/CanceledButton";
const IncrementationButton: React.FC<{
    initialState: number;
    onIncrementation: () => void;
    onDecrementation: () => void;
}> = (props) => {
    const [number, setNumber] = useState<number>(props.initialState);
    const onIncrementHandler = () => {
        props.onIncrementation();
        setNumber((prevState) => (prevState += 1));
    };
    const onDecrementHandler = () => {
        props.onDecrementation();
        setNumber((prevState) => (prevState -= 1));
    };
    return (
        <div>
            <div>
                <SuccessButton
                    className={styles["incrementation-button__plus"]}
                    button={{ onClick: onIncrementHandler }}
                >
                    +
                </SuccessButton>
            </div>
            <div>{number}</div>
            <div>
                <CanceledButton
                    className={styles["incrementation-button__minus"]}
                    button={{ onClick: onDecrementHandler }}
                >
                    -
                </CanceledButton>
            </div>
        </div>
    );
};
export default IncrementationButton;
