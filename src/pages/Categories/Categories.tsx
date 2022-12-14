import { useEffect, useState } from "react";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import Category from "../../models/Category";
import styles from "./Categories.module.scss";
const Categories: React.FC<{}> = () => {
    const [categories, setCategories] = useState<Category[]>();
    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await Category.getCategories();
            if (fetchedCategories instanceof Array) {
                setCategories(fetchedCategories);
            }
        };
        fetchCategories();
    }, []);
    return (
        <div className={styles["categories"]}>
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
