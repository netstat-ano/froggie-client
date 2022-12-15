import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Product from "../../models/Product";
import HeaderImage from "../HeaderImage/HeaderImage";
import ImagePreview from "../ImagePreview/ImagePreview";
import Modal from "../UI/Modal/Modal";
import Overlay from "../UI/Overlay/Overlay";
import SuccessButton from "../UI/SuccessButton/SuccessButton";
import styles from "./ProductDetail.module.scss";
const ProductDetail: React.FC<{}> = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product>();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProduct = async () => {
            const product = await Product.getProductByPk(productId!);
            if (product.id) {
                setProduct(product);
            } else {
                navigate("/404");
            }
        };
        fetchProduct();
    }, []);
    console.log(product?.imagesURL);

    return (
        <div className={`center ${styles["product-detail"]}`}>
            <Overlay>
                <>
                    <h2 className={styles["product-detail__name"]}>
                        {product?.name}
                    </h2>
                    <div className={styles["product-detail__header-image"]}>
                        <HeaderImage
                            url={`http://localhost:8080/${product?.imagesURL[0]}`}
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
                    <div>
                        <SuccessButton>Add to cart</SuccessButton>
                    </div>
                </>
            </Overlay>
        </div>
    );
};
export default ProductDetail;
