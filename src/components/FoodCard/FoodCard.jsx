import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useCart from "../../Hooks/useCart";

const FoodCard = ({ item }) => {
    const { name, price, image, recipe, _id } = item
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxiosSecure()
    const [, refetch] = useCart()


    const handleAddToCart = () => {
        if (user && user.email) {
            // TODO: send to the cartItem in database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price,
            }


            axiosSecure.post("/carts", cartItem)
                .then(res => {
                    // console.log(res.data);
                    if (res.data.insertedId) {
                        toast.success(`${name} added to your cart`)
                        refetch()
                    }
                })


        } else {
            Swal.fire({
                title: "Your not Logged In",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    //    send to the user login page 
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="absolute top-4 right-4 bg-slate-900 text-white  px-3 rounded-md">${price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button
                        onClick={() => handleAddToCart()}
                        className="btn btn-outline border-0 border-b-4  hover:text-orange-400 bg-slate-100 text-orange-400"> Add to Card</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;