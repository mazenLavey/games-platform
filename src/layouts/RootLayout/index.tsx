
import { Outlet } from "react-router-dom";
import Header from "layouts/Header";
import Toastify from "common/Toastify";

const RootLayout: React.FC = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Toastify />
        </>
    )
}

export default RootLayout;