import AccordionItem from "./AccordionItem/AccordionItem";
import styles from "./Accordion.module.scss";
export interface AccordionElement {
    hidden: JSX.Element;
    showed: JSX.Element;
}
const Accordion: React.FC<{ elements: AccordionElement[] }> = (props) => {
    return (
        <div className={`center-column`}>
            {props.elements.map((element) => (
                <AccordionItem element={element} />
            ))}
        </div>
    );
};
export default Accordion;
