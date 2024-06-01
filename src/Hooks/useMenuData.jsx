import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";



const useMenuData = () => {
    const axiosPublic = useAxiosPublic()
    const [loading] = useState(true)

    const { data: menu = [],
        refetch
    } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/menu')
            return data;
        }
    })

    return [menu, refetch, loading]
};

export default useMenuData;