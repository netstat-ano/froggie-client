import { forwardRef } from "react";
import BlueButton from "../BlueButton/BlueButton";
import GrayButton from "../GrayButton/GrayButton";
import styles from "./ImagePicker.module.scss";
const ImagePicker = forwardRef<
    HTMLInputElement,
    { input?: {}; className?: string; invalid: boolean; filesAmount: number }
>(
    (
        props: {
            input?: { id?: string };
            className?: string;
            invalid: boolean;
            filesAmount: number;
        },
        ref: React.ForwardedRef<HTMLInputElement>
    ) => {
        let inputId = "";
        if (props.input && props.input.id) {
            inputId = props.input.id;
        }
        return (
            <>
                <label htmlFor={`${inputId}`}>
                    {props.invalid && (
                        <GrayButton className={styles["label__button"]}>
                            Upload images
                        </GrayButton>
                    )}
                    {!props.invalid && (
                        <>
                            <BlueButton className={styles["label__button"]}>
                                Upload images
                            </BlueButton>
                            ({props.filesAmount})
                        </>
                    )}
                </label>
                <input
                    type="file"
                    ref={ref}
                    className={`${styles.input} ${
                        props.className ? props.className : ""
                    } ${props.invalid ? styles.invalid : ""}`}
                    {...props.input}
                ></input>
            </>
        );
    }
);
export default ImagePicker;
