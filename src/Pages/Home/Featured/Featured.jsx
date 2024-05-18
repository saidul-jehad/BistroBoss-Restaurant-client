import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import featured from '../../../assets/home/featured.jpg'
import './Featured.css'
const Featured = () => {
    return (
        <div className='featured-item bg-fixed py-11'>
            <SectionTitle
                heading='FROM OUR MENU'
                subHeading='Check it Out'
            ></SectionTitle>

            <div className='md:flex lg:gap-10 p-12 justify-center items-center text-white bg-slate-400 bg-opacity-30' >
                <div>
                    <img src={featured} alt="" />
                </div>

                <div>
                    <p>March 20, 2024</p>
                    <p className='uppercase'>Where can i get some</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id ducimus non quos atque blanditiis sit minima corrupti, quasi est aspernatur inventore nulla consequatur soluta repellendus obcaecati architecto natus porro iure facilis. Deleniti rerum, facilis vero doloribus ipsam officia cum expedita architecto culpa minima aut quam atque earum natus soluta magni.</p>

                    <button className='btn btn-outline btn-success mt-5 border-0  border-b-4'> <span className='text-white'>Order Now</span></button>
                </div>
            </div>
        </div>
    );
};

export default Featured;