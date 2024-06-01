import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";



// TODO: add published key  
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)

const Payment = () => {
    return (
        <div>
            <SectionTitle
                heading={"Payment"}
                subHeading={"Please pay and eat it"}
            > </SectionTitle>

            <div>
                <Elements stripe={stripePromise}>
                    <Checkout></Checkout>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;