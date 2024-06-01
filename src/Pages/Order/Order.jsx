import Cover from "../../Shared/Cover/Cover";
import orderCoverImg from '../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './ReactTabs.css'
import useMenuData from "../../Hooks/useMenuData";
import OrderTab from "./OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";




const Order = () => {
    const categories = ["salads", "pizza", "soups", "desserts", "drinks"]
    const { category } = useParams()
    const initialIndex = categories.indexOf(category)

    const [menu] = useMenuData()
    const [tabIndex, setTabIndex] = useState(initialIndex)

    // console.log(category);

    // const offered = menu.filter(item => item.category === "offered")
    const desserts = menu.filter(item => item.category === "dessert")
    const pizza = menu.filter(item => item.category === "pizza")
    const salads = menu.filter(item => item.category === "salad")
    const soups = menu.filter(item => item.category === "soup")
    const drinks = menu.filter(item => item.category === "drinks")


    return (
        <div>
            <Helmet><title>Bistro Boss | Order Food</title></Helmet>
            <Cover
                img={orderCoverImg}
                title={"Order Food"}
            ></Cover>

            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <div className="text-center">
                    <TabList>
                        <Tab>SALAD</Tab>
                        <Tab>PIZZA</Tab>
                        <Tab>SOUPS</Tab>
                        <Tab>DESSERTS</Tab>
                        <Tab>DRINKS</Tab>
                    </TabList>
                </div>

                <TabPanel>
                    <OrderTab items={salads}></OrderTab>
                </TabPanel>

                <TabPanel>
                    <OrderTab items={pizza}></OrderTab>
                </TabPanel>

                <TabPanel>
                    <OrderTab items={soups}></OrderTab>
                </TabPanel>

                <TabPanel>
                    <OrderTab items={desserts}></OrderTab>
                </TabPanel>

                <TabPanel>
                    <OrderTab items={drinks}></OrderTab>
                </TabPanel>

            </Tabs>
        </div>
    );
};

export default Order;