import React, { useState } from "react";
import Textarea from "../Textarea/Textarea";
import styles from "./AutoResizingTextarea.module.scss";
const AutoRezisingTextarea: React.FC<{
    textarea?: {};
    className?: string;
    invalid: boolean;
}> = (props) => {
    const [rows, setRows] = useState(2);
    const onChangeTextareaHandler = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        if (e.target.clientHeight < e.target.scrollHeight) {
            setRows((prevState) => (prevState += 1));
        }
    };
    const textareaOptions = {
        ...props.textarea,
        onChange: onChangeTextareaHandler,
        rows,
    };
    return (
        <Textarea
            textarea={textareaOptions}
            className={`${props.className ? props.className : ""} ${
                styles["resizing-textarea"]
            }`}
            invalid={props.invalid}
        ></Textarea>
    );
};
export default AutoRezisingTextarea;
