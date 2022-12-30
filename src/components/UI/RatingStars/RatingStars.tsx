import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "./RatingStars.module.scss";
import React, { useState } from "react";
const RatingStars: React.FC<{
    toggledStars: number;
    setToggledStars: React.Dispatch<React.SetStateAction<number>>;
}> = (props) => {
    const { toggledStars, setToggledStars } = props;
    const onMouseOverHandler = (
        e: React.MouseEvent<HTMLOrSVGElement>,
        starNumber: number
    ) => {
        setToggledStars(starNumber);
    };
    const onMouseLeaveHandler = (
        e: React.MouseEvent<HTMLOrSVGElement>,
        starNumber: number
    ) => {
        setToggledStars(starNumber);
    };

    return (
        <>
            <span>
                <FontAwesomeIcon
                    onMouseLeave={(e) => {
                        onMouseLeaveHandler(e, 1);
                    }}
                    onMouseOver={(e) => {
                        onMouseOverHandler(e, 1);
                    }}
                    className={`${
                        toggledStars <= 5 && toggledStars > 0
                            ? styles["star-gold"]
                            : styles["star-init"]
                    }`}
                    icon={faStar}
                />
            </span>
            <span>
                <FontAwesomeIcon
                    onMouseLeave={(e) => {
                        onMouseLeaveHandler(e, 2);
                    }}
                    onMouseOver={(e) => {
                        onMouseOverHandler(e, 2);
                    }}
                    className={`${
                        toggledStars <= 5 && toggledStars > 1
                            ? styles["star-gold"]
                            : styles["star-init"]
                    }`}
                    icon={faStar}
                />
            </span>
            <span>
                <FontAwesomeIcon
                    onMouseLeave={(e) => {
                        onMouseLeaveHandler(e, 3);
                    }}
                    onMouseOver={(e) => {
                        onMouseOverHandler(e, 3);
                    }}
                    className={`${
                        toggledStars <= 5 && toggledStars > 2
                            ? styles["star-gold"]
                            : styles["star-init"]
                    }`}
                    icon={faStar}
                />
            </span>
            <span>
                <FontAwesomeIcon
                    onMouseLeave={(e) => {
                        onMouseLeaveHandler(e, 4);
                    }}
                    onMouseOver={(e) => {
                        onMouseOverHandler(e, 4);
                    }}
                    className={`${
                        toggledStars <= 5 && toggledStars > 3
                            ? styles["star-gold"]
                            : styles["star-init"]
                    }`}
                    icon={faStar}
                />
            </span>
            <span>
                <FontAwesomeIcon
                    onMouseLeave={(e) => {
                        onMouseLeaveHandler(e, 5);
                    }}
                    onMouseOver={(e) => {
                        onMouseOverHandler(e, 5);
                    }}
                    className={`${
                        toggledStars === 5
                            ? styles["star-gold"]
                            : styles["star-init"]
                    }`}
                    icon={faStar}
                />
            </span>
        </>
    );
};
export default RatingStars;
