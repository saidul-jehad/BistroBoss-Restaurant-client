import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit } = useForm()


    const onSubmit = async (data) => {
        // console.log(data)
        // image upload to imgbb and get url
        const imageFile = { image: data.image[0] }
        const imageRes = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        if (imageRes.data.success) {
            // now send the menuItem data to the server with the image URL
            const menuItem = {
                name: data.name,
                category: data.category,
                recipe: data.recipe,
                price: parseFloat(data.price),
                image: imageRes.data.data.display_url
            }

            const menuRes = await axiosSecure.post('/menu', menuItem)
            // console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                // show success popup
                toast.success(`${data.name} the added menu item`)
            }
        }



    }
    return (
        <div>
            <SectionTitle
                heading={"Add an Item"}
                subHeading={'Whats new'}
            ></SectionTitle>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input
                            {...register("name", { required: true })}
                            type="text" placeholder="Enter Recipe Name "
                            className="input input-bordered w-full" />
                    </label>

                    <div className="flex gap-6">
                        {/* category */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <select
                                {...register("category", { required: true })}
                                defaultValue={"default"}
                                className="select select-bordered w-full "
                            >
                                <option disabled value={"default"}>Select your category</option>
                                <option value="salad"> Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </label>

                        {/* price */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input
                                {...register("price", { required: true })}
                                type="text" placeholder="Enter price "
                                className="input input-bordered w-full" />
                        </label>
                    </div>

                    {/* Recipe Details */}

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea
                            {...register("recipe", { required: true })}
                            className="textarea textarea-bordered h-24" placeholder="Recipe details"></textarea>
                    </label>

                    {/* file input */}
                    <div className="form-control w-full my-6">
                        <input
                            {...register("image", { required: true })}
                            type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </div>



                    <button className="btn text-white bg-gradient-to-l from-yellow-600 to-red-500">
                        Add Item <FaUtensils></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;