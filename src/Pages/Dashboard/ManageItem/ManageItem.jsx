import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useMenuData from "../../../Hooks/useMenuData";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItem = () => {
    const [menu, refetch, loading] = useMenuData()
    const axiosSecure = useAxiosSecure()

    const handleDeleteItem = (item) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const { data } = await axiosSecure.delete(`/menu/${item._id}`)
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} has been deleted`,
                        icon: "success"
                    });
                    refetch()
                }

            }
        });
    }


    return (
        <div>
            <SectionTitle
                heading={"Manage All Items"}
                subHeading={"Hurry Up"}
            ></SectionTitle>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="uppercase bg-yellow-400">
                                <th>#</th>
                                <th>Item Image</th>
                                <th>Item Name</th>
                                <th className="text-right">Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, idx) => <tr key={item._id}>
                                    <th>
                                        {idx + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td className="text-right">
                                        ${item.price}
                                    </td>
                                    <td>
                                        <Link to={`/dashboard/update-item/${item._id}`}>
                                            <button className="btn bg-orange-500 text-white btn-md"
                                            ><FaEdit></FaEdit></button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteItem(item)}
                                            className="btn bg-red-700 text-white btn-md"
                                        ><FaTrashAlt></FaTrashAlt></button>
                                    </td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default ManageItem;