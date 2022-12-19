import { useState, useEffect } from "react";
import styles from "./ImagePreview.module.scss";
const ImagePreview: React.FC<{
    url?: string;
    file?: any;
    index?: number;
    styleFirst?: boolean;
}> = (props) => {
    const [url, setUrl] = useState("");
    let optionalStyle = "";
    if (props.index === 0 && props.styleFirst === true) {
        optionalStyle = styles["image-preview__first-image"];
    }

    useEffect(() => {
        if (props.file) {
            setUrl(URL.createObjectURL(props.file));
        }
    }, [props.file]);
    return (
        <img
            className={`${styles["image-preview"]} ${optionalStyle}`}
            src={`${
                url ? url : `${process.env.REACT_APP_API_URL}/${props.url}`
            }`}
        ></img>
    );
};
export default ImagePreview;
