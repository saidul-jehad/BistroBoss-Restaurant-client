import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()



    const {
        data: cart = [],
        refetch,
    } = useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/carts?email=${user.email}`)
            // console.log(data)
            return data
        }
    })

    return [cart, refetch,];
};

export default useCart;