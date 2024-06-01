import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState("")
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const [cart, refetch] = useCart()
    const { user } = useAuth()
    const navigate = useNavigate()

    const totalPrice = cart.reduce((total, item) => total + item.price, 0)


    useEffect(() => {
        if (totalPrice) {
            axiosSecure.post('create-payment-intent', { price: totalPrice })
                .then(res => {
                    // console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [])




    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log(" payment error", error);
            setError(error.message)
        }
        else {
            console.log("payment method", paymentMethod);
            setError("")
        }


        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous"
                }
            }
        })

        if (confirmError) {
            console.log("confirm error", confirmError);
        } else {
            // console.log("payment Intent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id)

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert . use moment js to    
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }


                // 
                const { data } = await axiosSecure.post('/payments', payment)
                // console.log("payment saved", data);
                if (data.deleteResult.deletedCount > 0) {
                    refetch()


                    if (data?.paymentResult?.insertedId) {
                        toast.success("Payment Successfull")
                        navigate('/dashboard/payment-history')
                    }
                }

            }
        }
    }




    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-outline btn-accent my-7" type="submit"
                disabled={!stripe || !clientSecret}>
                Pay
            </button>

            <p className="text-red-600">{error}</p>
            {
                transactionId && <p className="text-green-500">Your Transaction Id : {transactionId}</p>
            }
        </form>
    );
};

export default Checkout;