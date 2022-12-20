import { useAppSelector } from "../../hooks/use-app-selector";
import CartItemCard from "../../components/CartItemCard/CartItemCard";
import Overlay from "../../components/UI/Overlay/Overlay";
import styles from "./Cart.module.scss";
const Cart: React.FC<{}> = () => {
    const cart = useAppSelector((state) => state.cart);

    return (
        <div className="center">
            <Overlay className={styles.cart}>
                <>
                    {cart.items.length > 0 &&
                        cart.items.map((cartItem) => (
                            <CartItemCard
                                key={cartItem.id}
                                product={cartItem}
                            />
                        ))}
                    {cart.items.length === 0 && (
                        <h1>You don't have anything in cart.</h1>
                    )}
                </>
            </Overlay>
        </div>
    );
};
export default Cart;
