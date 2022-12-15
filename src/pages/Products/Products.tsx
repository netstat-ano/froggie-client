import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import Product from "../../models/Product";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Products.module.scss";
const Products: React.FC<{}> = (props) => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState<Product[]>();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await Product.getProductByCategory(
                categoryId!
            );
            if (fetchedProducts instanceof Array) {
                setProducts(fetchedProducts);
            } else {
                navigate("/404");
            }
        };
        fetchProducts();
    }, []);
    return (
        <div className={styles["products"]}>
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
export default Products;
