import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()


    const { data: payments = [] } = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/payments/${user?.email}`)
            // console.log(data);
            return data
        }


    })

    return (
        <div>
            <h3>Total Payments : {payments.length}</h3>



            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className="bg-yellow-500">
                            <th>#</th>
                            <th>Total Price</th>
                            <th>Transaction id</th>
                            <th>Payment Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, idx) => <tr key={payment._id}>
                                <th>{idx + 1}</th>
                                <td>${payment.price}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.date}</td>
                                <td>{payment.status}</td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>



        </div>
    )
};

export default PaymentHistory;