import Category from "../../models/Category";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CategoryListItem.module.scss";
import { useAppSelector } from "../../hooks/use-app-selector";
const CategoryListItem: React.FC<{
    category: Category;
    setCategories: React.Dispatch<React.SetStateAction<Category[] | undefined>>;
}> = (props) => {
    const token = useAppSelector((state) => state.authentication.token);
    const onDeleteCategoryHandler = () => {
        const currentCategory = new Category(
            props.category.name,
            props.category.id
        );

        currentCategory.delete(token);
        props.setCategories((prevState) => {
            return prevState!.filter(
                (category) => category.id !== props.category.id
            );
        });
    };
    return (
        <li>
            {props.category.name}{" "}
            <FontAwesomeIcon
                onClick={onDeleteCategoryHandler}
                className={`${styles["category-list-item__delete"]}`}
                icon={faXmark}
            />
        </li>
    );
};
export default CategoryListItem;
