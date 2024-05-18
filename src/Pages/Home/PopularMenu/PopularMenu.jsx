import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../../Shared/MenuItem/MenuItem";
import useMenuData from "../../../Hooks/useMenuData";

const PopularMenu = () => {
    const [menu] = useMenuData()
    const popular = menu.filter(item => item.category === "popular")


    return (
        <div className="my-14">
            <SectionTitle
                heading="From Our Menu"
                subHeading="Popular Items"
            ></SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {
                    popular?.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>

            <div className="flex justify-center mt-8">
                <button className="btn border-0 border-b-4 btn-outline ">View Full Menu</button>
            </div>
        </div>
    );
};

export default PopularMenu;