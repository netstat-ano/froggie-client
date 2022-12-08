import ReactDOM from "react-dom";
const Modal: React.FC<{ children: JSX.Element }> = (props) => {
    return ReactDOM.createPortal(
        <>{props.children}</>,
        document.getElementById("modal-root") as HTMLElement
    );
};
export default Modal;
