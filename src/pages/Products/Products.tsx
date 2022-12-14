import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Product from "../../models/Product";
import ProductCard from "../../components/ProductCard/ProductCard";
const Products: React.FC<{}> = (props) => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState<Product[]>();
    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await Product.getProductByCategory(
                categoryId!
            );
            setProducts(fetchedProducts);
        };
        fetchProducts();
    }, []);
    return (
        <div>
            {products?.map((product) => (
                <ProductCard product={product} />
            ))}
        </div>
    );
};
export default Products;
