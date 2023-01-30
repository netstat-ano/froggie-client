import React, { useEffect, useState } from "react";
import Textarea from "../Textarea/Textarea";
import styles from "./AutoResizingTextarea.module.scss";
import { useRef } from "react";
const AutoRezisingTextarea: React.FC<{
    textarea?: {};
    className?: string;
    invalid: boolean;
    onMount?: () => void;
}> = (props) => {
    const [rows, setRows] = useState(2);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const onChangeTextareaHandler = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        if (e.target.clientHeight < e.target.scrollHeight) {
            setRows((prevState) => (prevState += 1));
        }
    };
    useEffect(() => {
        const times =
            textareaRef.current!.scrollHeight /
            textareaRef.current!.clientHeight;
        for (let i = 2; i < times; i++) {
            setRows((prevState) => (prevState += 1));
        }
        if (props.onMount) {
            props.onMount();
        }
    }, []);

    const textareaOptions = {
        ...props.textarea,
        onChange: onChangeTextareaHandler,
        rows,
    };
    return (
        <Textarea
            ref={textareaRef}
            textarea={textareaOptions}
            className={`${props.className ? props.className : ""} ${
                styles["resizing-textarea"]
            }`}
            invalid={props.invalid}
        ></Textarea>
    );
};
export default AutoRezisingTextarea;
