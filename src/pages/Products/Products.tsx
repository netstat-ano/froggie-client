import { useParams } from "react-router";
import { useEffect, useState, useCallback } from "react";
import Product from "../../models/Product";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Products.module.scss";
import useLoading from "../../hooks/use-loading";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import Header from "../../components/UI/Header/Header";
import Select from "../../components/UI/Select/Select";
import SortSettings from "../../interfaces/SortSettings";
const Products: React.FC<{}> = (props) => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState<Product[]>();
    const [isLoading, stopLoading] = useLoading();
    const [serverMessage, setServerMessage] = useState("");
    const fetchProducts = useCallback(
        async (options?: SortSettings) => {
            const fetchedProducts = await Product.getProductByCategory(
                categoryId!,
                options?.sort
            );
            if (fetchedProducts instanceof Array) {
                setProducts(fetchedProducts);
                stopLoading();
            } else {
                stopLoading();
                setServerMessage("No products found.");
            }
        },
        [categoryId]
    );
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
    const onSortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        if (value === "price_asc") {
            fetchProducts({ sort: "products.price ASC" });
        } else if (value === "price_desc") {
            fetchProducts({ sort: "products.price DESC" });
        } else {
            fetchProducts({});
        }
    };
    return (
        <>
            <div className="center">
                <Select
                    select={{ onChange: onSortHandler }}
                    className={styles["products__sort"]}
                >
                    <>
                        <option>Default</option>
                        <option value="price_asc">
                            Sort by price ascending
                        </option>
                        <option value="price_desc">
                            Sort by price descending
                        </option>
                    </>
                </Select>
            </div>
            <div className={styles["products"]}>
                {isLoading && <LoadingSpinner />}
                {serverMessage && <Header>{serverMessage}</Header>}
                {products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );
};
export default Products;
