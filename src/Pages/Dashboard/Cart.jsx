import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../Hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const Cart = () => {
    const [cart, refetch, isPending] = useCart()
    const axiosSecure = useAxiosSecure()

    const totalPrice = cart.reduce((total, item) => {
        return total + item.price
    }, 0)

    const handleDelete = (id, name) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(result => {
                        console.log(result.data);

                        if (result.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: `${name} has been deleted.`,
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }

    if (isPending) return <div className="flex justify-center mt-14"> <span className="loading loading-bars loading-lg"></span></div>

    return (
        <div className="">
            <div className="flex justify-evenly font-semibold">
                <h3 className="lg:text-4xl text-2xl  uppercase">Total Orders: {cart.length}</h3>
                <h3 className="lg:text-4xl text-2xl uppercase">Total Price: ${totalPrice}</h3>
                <button className="btn btn-outline btn-warning px-4">Pay</button>
            </div>



            <div className="overflow-x-auto mt-8">
                <table className="table">
                    {/* head */}
                    <thead className="bg-yellow-500 ">
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {
                            cart.map((item, idx) => <tr key={item._id}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Item image" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    ${item.price}
                                </td>
                                <th>
                                    <button onClick={() => handleDelete(item._id, item.name)} className="btn btn-ghost btn-lg "><FaTrashAlt className="text-red-600"></FaTrashAlt></button>
                                </th>
                            </tr>)
                        }

                        {/* row 1 */}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;