import { NavLink } from "react-router-dom";

const Navbar = () => {


    // const { user, logOut } = useAuth()

    // logout user 
    // const handleLogout = () => {
    //     logOut()
    //         .then(result => {
    //             const user = result?.user
    //             console.log(user);
    //         })
    //         .catch(error => console.log(error))
    // }

    const navLinks = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/menu'>Our Menu</NavLink></li>
        <li><NavLink to='/order/salads'>Order Food</NavLink></li>
        <li><NavLink to='/login'>Login</NavLink></li>
        {/* {
            user && <><li><NavLink to='/add-blog'>Add Blog</NavLink></li>
                <li><NavLink to='/wishlist'>Wishlist</NavLink></li></>
        } */}
    </>


    return (
        <div className="bg-black bg-opacity-30  text-white fixed z-10 max-w-screen-xl mx-auto navbar shadow-xl rounded-b-xl mb-[50px] ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-600 text-white rounded-box w-52">
                        {
                            navLinks
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl"> <img className="h-8 w-7 rounded-sm hidden lg:flex" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIoHA-5zG2KnleyJfDiEIVoQL84WynX3ea9jEZKeD0tA&s" alt="" />BistroBoss Restaurant</a>
            </div>

            <div className="lg:navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal  px-1">

                    {
                        navLinks
                    }
                </ul>
            </div>
            {/* <div className="navbar-end">
                {
                    user ? <div className="flex  items-center gap-3 md:gap-6 ">
                        <img data-tooltip-id="my-tooltip" data-tooltip-content={user.displayName} className="h-14 w-14 rounded-full" src={user.photoURL} alt="" /> <div onClick={handleLogout}><Link to='/login' className="btn btn-accent btn-outline">LogOut</Link></div> </div> :
                        <Link to='/login' className="btn btn-outline btn-accent">Login</Link>
                }
                <Tooltip id="my-tooltip" />
            </div> */}



        </div>
    );
};

export default Navbar;