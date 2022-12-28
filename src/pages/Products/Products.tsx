import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import Product from "../../models/Product";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Products.module.scss";
import useLoading from "../../hooks/use-loading";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import Header from "../../components/UI/Header/Header";
const Products: React.FC<{}> = (props) => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState<Product[]>();
    const [isLoading, stopLoading] = useLoading();
    const [serverMessage, setServerMessage] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await Product.getProductByCategory(
                categoryId!
            );
            if (fetchedProducts instanceof Array) {
                setProducts(fetchedProducts);
                stopLoading();
            } else {
                stopLoading();
                setServerMessage("No products found.");
            }
        };
        fetchProducts();
    }, []);
    return (
        <div className={styles["products"]}>
            {isLoading && <LoadingSpinner />}
            {serverMessage && <Header>{serverMessage}</Header>}
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
export default Products;
