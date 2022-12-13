import Category from "../../models/Category";
import CategoryListItem from "../CategoryListItem/CategoryListItem";
import styles from "./CategoriesList.module.scss";
const CategoriesList: React.FC<{
    categories?: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[] | undefined>>;
}> = (props) => {
    if (props.categories) {
        return (
            <ul className={styles["categories-list"]}>
                {props.categories.map((category) => (
                    <CategoryListItem
                        key={category.id}
                        setCategories={props.setCategories}
                        category={category}
                    />
                ))}
            </ul>
        );
    } else {
        return <></>;
    }
};
export default CategoriesList;
