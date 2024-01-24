import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faLink } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";

const Toastify = () => {
    return (
        <ToastContainer
            toastClassName="Toastify"
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={true}
            rtl={false}
            closeOnClick
            theme="dark"
        />
    );
};

export const toastNotifications = {
    warn: (message: string) => toast.warn( message, {
        icon: <FontAwesomeIcon icon={faCircleXmark} style={{color: "orange"}} />
    }),
    error: (message: string) => toast.error( message, {
        icon: <FontAwesomeIcon icon={faCircleXmark} style={{color: "red"}}/>
    }),
    success: (message: string) => toast.success(message, {
        icon: <FontAwesomeIcon icon={faCircleCheck} style={{color: "#4bff00"}}/>
    }),
    info: (message: string) => toast.info(message, {
        icon: <FontAwesomeIcon icon={faLink} style={{color: "#00e3ff"}}/>
    })
}

export default Toastify;