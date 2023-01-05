import { AccordionElement } from "../Accordion";
import { useState } from "react";
import styles from "./AccordionItem.module.scss";
const AccordionItem: React.FC<{ element: AccordionElement }> = (props) => {
    const [isContentHidden, setIsContentHidden] = useState(true);
    const onSlideHandler = () => {
        setIsContentHidden((prevState) => !prevState);
    };
    return (
        <div className={`${styles["accordion-item"]} center-column`}>
            <div
                onClick={onSlideHandler}
                className={styles["accordion-item-showed"]}
            >
                {props.element.showed}
            </div>
            {!isContentHidden && (
                <div className={styles["accordion-item-hidden"]}>
                    {props.element.hidden}
                </div>
            )}
        </div>
    );
};
export default AccordionItem;
