import styles from "./UserMenu.module.scss";
import HoverMenu from "../UI/HoverMenu/HoverMenu";
import NavButton from "../UI/NavButton/NavButton";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/use-app-selector";
const UserMenu: React.FC<{ onOver: () => void; onOut: () => void }> = (
    props
) => {
    const userId = useAppSelector((state) => state.authentication.userId);
    return (
        <HoverMenu
            div={{
                onMouseOver: props.onOver,
                onMouseOut: props.onOut,
            }}
            className={styles["user-menu"]}
        >
            <li>
                <div>
                    <NavButton className={styles["user-menu__li__button"]}>
                        <Link className="link" to={`/my-orders`}>
                            My orders
                        </Link>
                    </NavButton>
                </div>
                <div>
                    <NavButton className={styles["user-menu__li__button"]}>
                        <Link className="link" to={`/orders-to-realize`}>
                            Orders to realize
                        </Link>
                    </NavButton>
                </div>
            </li>
        </HoverMenu>
    );
};
export default UserMenu;
