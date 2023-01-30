import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppSelector } from "../../hooks/use-app-selector";
import Product from "../../models/Product";
import HeaderImage from "../../components/HeaderImage/HeaderImage";
import ImagePreview from "../../components/ImagePreview/ImagePreview";
import { cartActions } from "../../store/cart";
import Overlay from "../../components/UI/Overlay/Overlay";
import SuccessButton from "../../components/UI/SuccessButton/SuccessButton";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenToSquare,
    faShoppingCart,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./ProductDetail.module.scss";
import CartItem from "../../models/CartItem";
import useLoading from "../../hooks/use-loading";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import Comments from "../../components/Comments/Comments";
import Slider from "../../components/UI/Slider/Slider";
import CanceledButton from "../../components/UI/CanceledButton/CanceledButton";
const ProductDetail: React.FC<{}> = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product>();
    const [averageRate, setAverageRate] = useState("");
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.authentication.token);
    const userType = useAppSelector((state) => state.authentication.type);
    const navigate = useNavigate();
    const [serverMessage, setServerMessage] = useState("");
    const [isLoading, stopLoading] = useLoading();
    useEffect(() => {
        const fetchProduct = async () => {
            const product = await Product.getProductByPk(productId!);
            const rate = await Product.fetchAverageRate(Number(productId));
            if (typeof rate === "string") {
                if (rate !== "null") {
                    setAverageRate(rate);
                }
            }

            if (product instanceof Object) {
                setProduct(product);
                stopLoading();
            } else {
                stopLoading();
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
    const onDeleteHandler = async () => {
        const response = await Product.delete(Number(product!.id), token);
        if (!response.ok) {
            setServerMessage(response.message);
        } else {
            navigate(`/category/${product?.categoryId}`);
        }
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
    let rateStyles = "";
    const parsedRate = parseFloat(averageRate);
    if (parsedRate > 3 && parsedRate < 4) {
        rateStyles = styles["average-rate"];
    } else if (parsedRate >= 4) {
        rateStyles = styles["good-rate"];
    } else {
        rateStyles = styles["bad-rate"];
    }
    return (
        <div className={`center ${styles["product-detail"]}`}>
            {isLoading && <LoadingSpinner />}

            {!isLoading && (
                <Overlay className={styles["product-detail__overlay"]}>
                    <>
                        <h2 className={styles["product-detail__name"]}>
                            {product?.name}
                        </h2>
                        {averageRate && (
                            <h3 className={rateStyles}>{averageRate}/5.0</h3>
                        )}

                        <Slider images={product?.imagesURL} />

                        <div className={styles["product-detail__description"]}>
                            {product?.description}
                        </div>
                        <div className={styles["product-detail__price"]}>
                            $ {product?.price}
                        </div>
                        {userType === "admin" && (
                            <div>
                                <SuccessButton
                                    button={{ onClick: onEditHandler }}
                                >
                                    <>
                                        <FontAwesomeIcon icon={faPenToSquare} />{" "}
                                        Edit
                                    </>
                                </SuccessButton>{" "}
                                <CanceledButton
                                    button={{ onClick: onDeleteHandler }}
                                >
                                    <>
                                        <FontAwesomeIcon icon={faTrash} />{" "}
                                        Delete
                                    </>
                                </CanceledButton>
                            </div>
                        )}
                        {userType === "customer" && (
                            <div
                                className={
                                    styles["product-detail__add-to-cart"]
                                }
                            >
                                <SuccessButton
                                    button={{ onClick: onAddToCartHandler }}
                                >
                                    <>
                                        <FontAwesomeIcon
                                            icon={faShoppingCart}
                                        />{" "}
                                        Add to cart
                                    </>
                                </SuccessButton>
                            </div>
                        )}
                        <Comments setAverageRate={setAverageRate} />
                    </>
                </Overlay>
            )}
        </div>
    );
};
export default ProductDetail;
