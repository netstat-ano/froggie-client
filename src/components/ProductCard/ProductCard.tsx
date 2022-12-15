import Product from "../../models/Product";
import styles from "./ProductCard.module.scss";
import Overlay from "../UI/Overlay/Overlay";
import { Link } from "react-router-dom";
const ProductCard: React.FC<{ product: Product }> = (props) => {
    return (
        <Link className="link" to={`/product/${props.product.id}`}>
            <Overlay className={styles["product-card"]}>
                <>
                    <div className={styles["product-card__name"]}>
                        {props.product.name}
                    </div>
                    <img
                        className={styles["product-card__img-preview"]}
                        src={`http://localhost:8080/${props.product.imagesURL[0]}`}
                    ></img>
                    <div className={styles["product-card__price"]}>
                        $ {props.product.price}
                    </div>
                </>
            </Overlay>
        </Link>
    );
};
export default ProductCard;
