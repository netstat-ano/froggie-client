import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ImagePreview from "../../ImagePreview/ImagePreview";
import styles from "./Slider.module.scss";
const Slider: React.FC<{ images: any }> = (props) => {
    const [currentImg, setCurrentImg] = useState(props.images[0]);

    const onLeftHandler = () => {
        if (props.images.indexOf(currentImg) - 1 < 0) {
            setCurrentImg(props.images[props.images.length - 1]);
            return;
        }
        setCurrentImg(props.images[props.images.indexOf(currentImg) - 1]);
    };
    const onRightHandler = () => {
        if (props.images.indexOf(currentImg) + 1 > props.images.length - 1) {
            setCurrentImg(props.images[0]);
            return;
        }
        setCurrentImg(props.images[props.images.indexOf(currentImg) + 1]);
    };
    const onImgThumbnailClick = (index: number) => {
        setCurrentImg(props.images[index]);
    };
    return (
        <>
            <div className={`${styles["slider"]} noselect`}>
                <div className={styles["slider__main"]}>
                    <div
                        onClick={onLeftHandler}
                        className={`${styles["slider__left"]} center`}
                    >
                        <FontAwesomeIcon icon={faCaretLeft} />
                    </div>
                    <div className={`${styles["slider__img-wrapper"]} center`}>
                        <img
                            className={`${styles["slider__img-wrapper__img"]}`}
                            src={`${process.env.REACT_APP_FTP_IMG_URL}/${currentImg}`}
                        ></img>
                    </div>
                    <div
                        onClick={onRightHandler}
                        className={`${styles["slider__right"]} center`}
                    >
                        <FontAwesomeIcon icon={faCaretRight} />
                    </div>
                </div>
                <div className={`${styles["slider__thumbnails"]} center`}>
                    {props?.images.map((url: string, index: number) => {
                        return (
                            <div
                                className={`${
                                    styles["slider__thumbnails__img"]
                                } ${
                                    props.images.indexOf(currentImg) === index
                                        ? styles[
                                              "slider__thumbnails__img-chosen"
                                          ]
                                        : ""
                                }`}
                            >
                                <ImagePreview
                                    img={{
                                        onClick: () => {
                                            onImgThumbnailClick(index);
                                        },
                                    }}
                                    url={url}
                                />
                            </div>
                        );
                    })}
                </div>
                <div></div>
            </div>
        </>
    );
};
export default Slider;
