import { useState } from "react";
import clearNotification from "../utils/clearNotification";

const useServerError = (
    timeout: number
): [string, React.Dispatch<React.SetStateAction<string>>, () => void] => {
    const [serverMessage, setServerMessage] = useState("");
    const stop = () => {
        clearNotification(setServerMessage, timeout);
    };
    return [serverMessage, setServerMessage, stop];
};
export default useServerError;
