const clearNotification = (
    cb: React.Dispatch<React.SetStateAction<string>>,
    timeout: number
) => {
    setTimeout(() => {
        cb("");
    }, timeout);
};
export default clearNotification;
