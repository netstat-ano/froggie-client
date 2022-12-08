import SuccessButton from "../UI/SuccessButton/SuccessButton";
import { useState } from "react";
import Modal from "../UI/Modal/Modal";
import styles from "./UserAdminActions.module.scss";
import ProductCreator from "../ProductCreator/ProductCreator";
const UserAdminActions: React.FC<{}> = () => {
    const [isModalShowed, setIsModalShowed] = useState(false);
    const onActivateModelHandler = () => {
        setIsModalShowed((prevState) => !prevState);
    };

    return (
        <>
            {isModalShowed && (
                <Modal>
                    <ProductCreator />
                </Modal>
            )}
            <SuccessButton button={{ onClick: onActivateModelHandler }}>
                Create a product
            </SuccessButton>
        </>
    );
};
export default UserAdminActions;
