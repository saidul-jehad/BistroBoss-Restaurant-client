import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";

const Root = () => {
    const location = useLocation()
    const isLogin = location.pathname.includes("login") || location.pathname.includes("register")

    return (
        <div>
            {isLogin || <Navbar></Navbar>}
            <Outlet></Outlet>
            {isLogin || <Footer></Footer>}
        </div>
    );
};

export default Root;