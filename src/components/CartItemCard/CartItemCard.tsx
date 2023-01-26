import CartItem from "../../models/CartItem";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import ImagePreview from "../ImagePreview/ImagePreview";
import styles from "./CartItemCard.module.scss";
import { cartActions } from "../../store/cart";
import { useAppSelector } from "../../hooks/use-app-selector";
import IncrementationButton from "../UI/IncrementationButton/IncrementationButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const CartItemCard: React.FC<{ product: CartItem }> = (props) => {
    const { product } = props;
    const token = useAppSelector((state) => state.authentication.token);
    const dispatch = useAppDispatch();
    const onDeleteFromCartHandler = async () => {
        const cartItem = new CartItem(
            props.product.name,
            props.product.description,
            props.product.price,
            props.product.imagesURL,
            props.product.categoryId,
            1
        );
        dispatch(
            cartActions.reduce({
                ...cartItem,
                id: product.id,
                quantity: product.amount,
            })
        );
        await cartItem.reduce(product.id!, token, product.amount);
    };
    const onAddToCartHandler = async () => {
        const cartItem = new CartItem(
            props.product.name,
            props.product.description,
            props.product.price,
            props.product.imagesURL,
            props.product.categoryId,
            1
        );
        dispatch(cartActions.addToCart({ ...cartItem, id: product!.id! }));
        await cartItem.addToCart(product!.id!, token);
    };
    const onRemoveFromCartHandler = async () => {
        const cartItem = new CartItem(
            props.product.name,
            props.product.description,
            props.product.price,
            props.product.imagesURL,
            props.product.categoryId,
            1
        );
        dispatch(
            cartActions.reduce({ ...cartItem, id: product!.id!, quantity: 1 })
        );
        await cartItem.reduce(props.product!.id!, token, 1);
    };
    return (
        <div className={`${styles["cart-item-card"]} center`}>
            <>
                <div className={styles["cart-item-card__img"]}>
                    <ImagePreview url={product.imagesURL[0]} />
                </div>
                <div>{product.name}</div>
                <div>$ {product.price}</div>
                <IncrementationButton
                    onIncrementation={onAddToCartHandler}
                    onDecrementation={onRemoveFromCartHandler}
                    initialState={product.amount}
                />
                <div>
                    <FontAwesomeIcon
                        onClick={onDeleteFromCartHandler}
                        className={styles["cart-item-card__delete-icon"]}
                        icon={faXmark}
                    />
                </div>
            </>
        </div>
    );
};
export default CartItemCard;
