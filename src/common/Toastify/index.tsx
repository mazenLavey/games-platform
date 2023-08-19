
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";


const Toastify = () => {
    return (
        <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    );
};


export const toastNotifications = {
    warn: () => toast.warn("Somthing went wrong.", {
        icon: <FontAwesomeIcon icon={faCircleXmark} style={{color: "orange"}} />
    }),
    error: (error: string) => toast.error(`${error}`, {
        icon: <FontAwesomeIcon icon={faCircleXmark} style={{color: "red"}}/>
    }),
    success: () => toast.success("Send the game 'ID' to start playing with a friend.", {
        icon: <FontAwesomeIcon icon={faCircleCheck} style={{color: "#ff5eb2"}}/>
    }),
    info: () => toast.info("Link copied.", {
        icon: <FontAwesomeIcon icon={faCircleCheck} style={{color: "#7f19f2"}}/>
    })
}

export default Toastify;