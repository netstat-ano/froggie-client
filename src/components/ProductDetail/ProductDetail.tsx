import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppSelector } from "../../hooks/use-app-selector";
import Product from "../../models/Product";
import HeaderImage from "../HeaderImage/HeaderImage";
import ImagePreview from "../ImagePreview/ImagePreview";
import { cartActions } from "../../store/cart";
import Overlay from "../UI/Overlay/Overlay";
import SuccessButton from "../UI/SuccessButton/SuccessButton";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenToSquare,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./ProductDetail.module.scss";
import CartItem from "../../models/CartItem";
const ProductDetail: React.FC<{}> = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product>();
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.authentication.token);
    const userType = useAppSelector((state) => state.authentication.type);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProduct = async () => {
            const product = await Product.getProductByPk(productId!);
            if (product instanceof Object) {
                setProduct(product);
            } else {
                navigate("/404");
            }
        };
        fetchProduct();
    }, []);
    const onEditHandler = () => {
        navigate(
            `/admin/create-product?edit=true&productName=${
                product!.name
            }&description=${product!.description}&price=${
                product!.price
            }&id=${product!.id!}`
        );
    };
    const onAddToCartHandler = async () => {
        const cartItem = new CartItem(
            product!.name,
            product!.description,
            product!.price,
            product!.imagesURL,
            product!.categoryId,
            1
        );
        dispatch(cartActions.addToCart({ ...cartItem, id: product!.id! }));
        await cartItem.addToCart(product!.id!, token);
    };
    return (
        <div className={`center ${styles["product-detail"]}`}>
            <Overlay>
                <>
                    <h2 className={styles["product-detail__name"]}>
                        {product?.name}
                    </h2>
                    <div className={styles["product-detail__header-image"]}>
                        <HeaderImage
                            url={`${process.env.REACT_APP_API_URL}/${product?.imagesURL[0]}`}
                        />
                    </div>
                    <div>
                        {product?.imagesURL.map(
                            (url: string, index: number) => {
                                if (index !== 0) {
                                    return <ImagePreview url={url} />;
                                }
                            }
                        )}
                    </div>
                    <div className={styles["product-detail__description"]}>
                        {product?.description}
                    </div>
                    <div className={styles["product-detail__price"]}>
                        $ {product?.price}
                    </div>
                    {userType === "admin" && (
                        <div>
                            <SuccessButton button={{ onClick: onEditHandler }}>
                                <>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                    Edit
                                </>
                            </SuccessButton>
                        </div>
                    )}
                    {token && (
                        <div className={styles["product-detail__add-to-cart"]}>
                            <SuccessButton
                                button={{ onClick: onAddToCartHandler }}
                            >
                                <>
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    Add to cart
                                </>
                            </SuccessButton>
                        </div>
                    )}
                </>
            </Overlay>
        </div>
    );
};
export default ProductDetail;
