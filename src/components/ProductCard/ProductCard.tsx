import Product from "../../models/Product";
import styles from "./ProductCard.module.scss";
import Overlay from "../UI/Overlay/Overlay";
const ProductCard: React.FC<{ product: Product }> = (props) => {
    return (
        <Overlay className={styles["product-card"]}>
            <img
                className={styles["product-card__img-preview"]}
                src={`http://localhost:8080/${props.product.imagesURL[0]}`}
            ></img>
        </Overlay>
    );
};
export default ProductCard;
