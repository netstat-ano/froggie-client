import { useState, useEffect } from "react";
import styles from "./ImagePreview.module.scss";
const ImagePreview: React.FC<{ file: any }> = (props) => {
    const [url, setUrl] = useState("");

    useEffect(() => {
        setUrl(URL.createObjectURL(props.file));
    }, [props.file]);
    return <img className={styles["image-preview"]} src={url}></img>;
};
export default ImagePreview;
