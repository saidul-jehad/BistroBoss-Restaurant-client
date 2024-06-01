import { Helmet } from "react-helmet-async";
import Cover from "../../../Shared/Cover/Cover";
import useMenuData from "../../../Hooks/useMenuData";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

import imgMenu from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'




const Menu = () => {
    const [menu] = useMenuData()

    const offered = menu.filter(item => item.category === "offered")
    const desserts = menu.filter(item => item.category === "dessert")
    const pizza = menu.filter(item => item.category === "pizza")
    const salads = menu.filter(item => item.category === "salad")
    const soups = menu.filter(item => item.category === "soup")

    console.log(soups);


    return (
        <div>
            <Helmet><title>Bistro Boss | Menu</title></Helmet>
            {/* Main Cover */}
            <Cover img={imgMenu} title={"our menu"}></Cover>


            {/* Offered Menu Items */}
            <SectionTitle heading={"Todays Offer"} subHeading={"Don'n Miss"}></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>

            {/* desserts menu items */}
            <MenuCategory items={desserts} title={"desserts"} img={dessertImg} ></MenuCategory>

            {/* pizza menu items */}
            <MenuCategory items={pizza} title={"pizza"} img={pizzaImg} ></MenuCategory>

            {/* salads menu items */}
            <MenuCategory items={salads} title={"salads"} img={saladImg} ></MenuCategory>

            {/* soups menu items */}
            <MenuCategory items={soups} title={"soups"} img={soupImg} ></MenuCategory>


        </div>
    );
};

export default Menu;