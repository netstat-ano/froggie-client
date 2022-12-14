import styles from "./CategoryCard.module.scss";
import Overlay from "../UI/Overlay/Overlay";
import { Link } from "react-router-dom";
const CategoryCard: React.FC<{ id: number; name: string }> = (props) => {
    return (
        <Link className="link" to={`/${props.id}`}>
            <Overlay className={styles["category-card"]}>
                <div>{props.name}</div>
            </Overlay>
        </Link>
    );
};
export default CategoryCard;
