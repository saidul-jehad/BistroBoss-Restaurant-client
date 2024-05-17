
import bannerBg from '../../../assets/home/chef-service.jpg'

const Banner2 = () => {
    return (
        <div className=' my-11 relative hidden lg:flex'>
            <div className='bg-white p-28 text-center m-24 absolute top-0 bottom-0 flex flex-col justify-center gap-3'>
                <h3 className='text text-4xl uppercase '>Bistro Boss</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
            </div>
            <img className='bg-cover h-full' src={bannerBg} alt="" />
        </div>
    );
};

export default Banner2;