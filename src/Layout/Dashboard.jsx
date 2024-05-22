import { FaAddressCard, FaCalendar, FaHome, FaList } from "react-icons/fa";
import { FaCableCar } from "react-icons/fa6";
import { GiShoppingCart } from "react-icons/gi";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";

const Dashboard = () => {
    const [cart] = useCart()
    const dashboardLinks = <>
        <li>
            <NavLink to={"/dashboard/user-home"}>
                <FaHome> </FaHome>
                User Home
            </NavLink>
        </li>

        <li>
            <NavLink to={"/dashboard/reservation"}>
                <FaCalendar></FaCalendar>
                Reservation
            </NavLink>
        </li>

        <li>
            <NavLink to={"/dashboard/cart"}>
                <GiShoppingCart></GiShoppingCart>
                My Cart ({cart.length})
            </NavLink>
        </li>

        <li>
            <NavLink to={"/dashboard/review"}>
                <FaAddressCard></FaAddressCard>
                Add a Review
            </NavLink>
        </li>

        <li>
            <NavLink to={"/dashboard/bookings"}>
                <FaList></FaList>
                My Bookings
            </NavLink>
        </li>


        <div className="divider"></div>


        <li>
            <NavLink to={"/"}>
                <FaHome> </FaHome>
                Home
            </NavLink>
        </li>


        <li>
            <NavLink to={"/order/salads"}>
                <FaCableCar>   </FaCableCar>
                Menu
            </NavLink>
        </li>
    </>
    return (
        <div className="">
            <div className="navbar-start flex md:hidden">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm bg-yellow-500 dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            dashboardLinks
                        }
                    </ul>
                </div>
            </div>

            <div className="flex">
                <div className="w-64 min-h-screen hidden md:flex bg-orange-400">
                    <ul className="menu p-5 space-y-4">
                        {
                            dashboardLinks
                        }



                    </ul>
                </div>
                {/* Dashboard content */}
                <div className="flex-1 p-8 mx-auto w-[98%]">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;