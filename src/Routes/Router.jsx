import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/MenuPage/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItem from "../Pages/Dashboard/ManageItem/ManageItem";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/menu',
                element:<Menu></Menu>
            },
            {
                path: '/order',
                element: <Order></Order>
            },
            {
                path: '/order/:category',
                element: <Order></Order>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // users route
            {
                path: 'user-home',
                element: <UserHome></UserHome>
            },
            {
                path: 'cart',
                element: <Cart></Cart>
            },

            {
                path: 'payment',
                element: <Payment></Payment>,
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>
            }
            ,
            // admin routes
            {
                path: 'admin-home',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },

            {
                path: 'add-items',
                element: <AdminRoute> <AddItems></AddItems></AdminRoute>
            },
            {
                path: 'manage-items',
                element: <AdminRoute><ManageItem></ManageItem></AdminRoute>
            },
            {
                path: 'update-item/:id',
                element: <AdminRoute> <UpdateItem></UpdateItem></AdminRoute>,
                loader: ({ params }) => fetch(`https://bistro-boss-server-chi-five.vercel.app/menu/${params.id}`)
            },
            {
                path: 'all-users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
        ]
    }
]);
