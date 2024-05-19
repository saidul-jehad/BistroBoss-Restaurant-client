
import { Link } from 'react-router-dom';
import img from '../../assets/others/authentication2.png';
import useAuth from '../../Hooks/useAuth';



const Register = () => {

    const { createUser } = useAuth()

    const handleRegister = event => {
        event.preventDefault()
        const form = event.target
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        // create user
        createUser(email, password)
        .then(res => {
            console.log(res.user);
        })

    }


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row md:w-3/4">
                <div className="text-center lg:text-left hidden lg:flex">
                    <img src={img} alt="" />
                </div>

                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-3xl font-bold text-center mt-6">Register now!</h1>
                    <form className="card-body" onSubmit={handleRegister}>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" className="input input-bordered" required name="name" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" required name="email" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required name="password" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>


                        <div className="form-control mt-6">
                            <button className="btn btn-outline text-white bg-[#D1A054]">Register</button>
                        </div>

                        <p className='text-sm text-center text-[#D1A054]'> Already registered ? <Link to={"/login"} className='btn-link text-[#D1A054]'>Go to Login</Link> </p>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Register;