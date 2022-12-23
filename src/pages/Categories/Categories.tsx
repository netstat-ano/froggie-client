import { useEffect, useState } from "react";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import useLoading from "../../hooks/use-loading";
import Category from "../../models/Category";
import styles from "./Categories.module.scss";
const Categories: React.FC<{}> = () => {
    const [categories, setCategories] = useState<Category[]>();
    const [isLoading, stopLoading] = useLoading();
    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await Category.getCategories();
            if (fetchedCategories instanceof Array) {
                setCategories(fetchedCategories);
                stopLoading();
            }
        };
        fetchCategories();
    }, []);
    return (
        <div className={styles["categories"]}>
            {isLoading && <LoadingSpinner />}
            {categories?.map((categoryDetails) => (
                <CategoryCard
                    key={categoryDetails.id!}
                    id={categoryDetails.id!}
                    name={categoryDetails.name}
                />
            ))}
        </div>
    );
};
export default Categories;
