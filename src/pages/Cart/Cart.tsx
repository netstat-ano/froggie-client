import { useAppSelector } from "../../hooks/use-app-selector";
import CartItemCard from "../../components/CartItemCard/CartItemCard";
import Overlay from "../../components/UI/Overlay/Overlay";
import styles from "./Cart.module.scss";
import SuccessButton from "../../components/UI/SuccessButton/SuccessButton";
import { cartActions } from "../../store/cart";
import CartModel from "../../models/Cart";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import Order from "../../models/Order";
const Cart: React.FC<{}> = () => {
    const cart = useAppSelector((state) => state.cart);
    const token = useAppSelector((state) => state.authentication.token);
    const dispatch = useAppDispatch();
    const onOrderHandler = async () => {
        const order = new Order(cart.items);
        order.save(token);
        const cartModel = new CartModel(token);
        dispatch(cartActions.reset());
        await cartModel.delete();
    };
    return (
        <div className="center">
            <Overlay className={styles.cart}>
                <>
                    {cart.items.length > 0 && (
                        <>
                            {cart.items.map((cartItem) => (
                                <CartItemCard
                                    key={cartItem.id}
                                    product={cartItem}
                                />
                            ))}
                            <div className={styles["cart__total"]}>
                                Total price:{" "}
                                <span className={styles["cart__total__price"]}>
                                    $ {cart.totalPrice}
                                </span>
                            </div>
                            <div className={styles["cart__order-btn"]}>
                                <SuccessButton
                                    button={{ onClick: onOrderHandler }}
                                >
                                    Order now
                                </SuccessButton>
                            </div>
                        </>
                    )}
                    {cart.items.length === 0 && (
                        <h1>You don't have anything in cart.</h1>
                    )}
                </>
            </Overlay>
        </div>
    );
};
export default Cart;
