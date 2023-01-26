import { useAppSelector } from "../../hooks/use-app-selector";
import CartItemCard from "../../components/CartItemCard/CartItemCard";
import Overlay from "../../components/UI/Overlay/Overlay";
import styles from "./Cart.module.scss";
import SuccessButton from "../../components/UI/SuccessButton/SuccessButton";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import openSocket from "socket.io-client";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../../models/CartItem";
import { cartActions } from "../../store/cart";
const Cart: React.FC<{}> = () => {
    const cart = useAppSelector((state) => state.cart);
    const token = useAppSelector((state) => state.authentication.token);
    const type = useAppSelector((state) => state.authentication.type);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate("/unauthorized");
        }
        if (type === "customer") {
            const socket = openSocket(`${process.env.REACT_APP_API_URL}`);
            socket.on("product", async (data) => {
                if (data.action === "UPDATE") {
                    const fetchedCart = await CartItem.fetchCart(token);
                    if (fetchedCart.constructor === Array) {
                        dispatch(cartActions.reset());
                        dispatch(cartActions.init(fetchedCart));
                    }
                }
            });
        }
    }, []);
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
                                <Link to="/order">
                                    <SuccessButton>Order now</SuccessButton>
                                </Link>
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
