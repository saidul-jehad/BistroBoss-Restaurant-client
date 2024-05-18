import Cover from "../../../Shared/Cover/Cover";
import MenuItem from "../../../Shared/MenuItem/MenuItem";


const MenuCategory = ({ items, title, img }) => {
    return (
        <div className="py-8">

            {
                title && <Cover img={img} title={title}></Cover>
            }

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16">
                {
                    items?.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>

            <div className="flex justify-center mt-8">
                <button className="btn border-0 border-b-4 btn-outline ">ORDER YOUR FAVORITE FOOD</button>
            </div>

        </div>
    );
};

export default MenuCategory;