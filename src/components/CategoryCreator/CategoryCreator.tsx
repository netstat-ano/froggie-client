import Input from "../UI/Input/Input";
import Select from "../UI/Select/Select";
import BlueButton from "../UI/BlueButton/BlueButton";
import { useState } from "react";
import Category from "../../models/Category";
import InputErrorMessage from "../UI/InputErrorMessage/InputErrorMessage";
import { useAppSelector } from "../../hooks/use-app-selector";
import styles from "./CategoryCreator.module.scss";
import CategoriesList from "../CategoriesList/CategoriesList";
const CategoryCreator: React.FC<{
    categories?: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[] | undefined>>;
}> = (props) => {
    const [addCategoryValue, setAddCategoryValue] = useState("");
    const [addCategoryError, setAddCategoryError] = useState("");
    const token = useAppSelector((state) => state.authentication.token);
    const onAddCategoryHandler = () => {
        if (addCategoryValue) {
            const category = new Category(addCategoryValue);
            category.save(token);
            return;
        }
    };
    return (
        <div className={styles["category-creator"]}>
            <div>
                <Input
                    input={{
                        onChange: (e: React.FormEvent<HTMLInputElement>) => {
                            const tgt = e.target as HTMLInputElement;
                            setAddCategoryValue(tgt.value);
                            if (!tgt.value) {
                                setAddCategoryError(
                                    "If you want to add category It can't be empty."
                                );
                            } else {
                                setAddCategoryError("");
                            }
                        },
                        value: addCategoryValue,
                    }}
                    invalid={false}
                />
            </div>
            <CategoriesList
                setCategories={props.setCategories}
                categories={props.categories}
            />
            <div>
                <BlueButton
                    button={{
                        onClick: onAddCategoryHandler,
                        type: "button",
                    }}
                    className={styles["category-creator__btn"]}
                >
                    Add category
                </BlueButton>
            </div>
            <div>
                {addCategoryError && (
                    <InputErrorMessage message={addCategoryError} />
                )}
            </div>
        </div>
    );
};
export default CategoryCreator;
