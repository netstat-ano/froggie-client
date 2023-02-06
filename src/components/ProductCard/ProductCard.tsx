import Product from "../../models/Product";
import styles from "./ProductCard.module.scss";
import Overlay from "../UI/Overlay/Overlay";
import { Link } from "react-router-dom";
import SuccessButton from "../UI/SuccessButton/SuccessButton";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import CartItem from "../../models/CartItem";
import { useAppSelector } from "../../hooks/use-app-selector";
import { cartActions } from "../../store/cart";
const ProductCard: React.FC<{ product: Product }> = (props) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.authentication.token);
    const type = useAppSelector((state) => state.authentication.type);
    const onAddToCartHandler = async () => {
        const cartItem = new CartItem(
            props.product.name,
            props.product.description,
            props.product.price,
            props.product.imagesURL,
            props.product.CategoryId,
            1
        );
        dispatch(
            cartActions.addToCart({ ...cartItem, id: props.product!.id! })
        );
        await cartItem.addToCart(props.product!.id!, token);
    };
    return (
        <Overlay className={styles["product-card"]}>
            <>
                <Link className="link" to={`/product/${props.product.id}`}>
                    <div className={styles["product-card__name"]}>
                        {props.product.name}
                    </div>
                    <img
                        alt="product_img"
                        className={styles["product-card__img-preview"]}
                        src={`${process.env.REACT_APP_FTP_IMG_URL}/${props.product.imagesURL[0]}`}
                    ></img>
                    <div className={styles["product-card__price"]}>
                        $ {props.product.price}
                    </div>
                </Link>
                {type === "customer" && (
                    <SuccessButton button={{ onClick: onAddToCartHandler }}>
                        Add to cart
                    </SuccessButton>
                )}
            </>
        </Overlay>
    );
};
export default ProductCard;
