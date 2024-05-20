
import { Link } from 'react-router-dom';
import img from '../../assets/others/authentication2.png';
import useAuth from '../../Hooks/useAuth';
import { useForm } from "react-hook-form"
import { Helmet } from 'react-helmet-async';


const Register = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {

        // create user
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
            })
    }

    const { createUser } = useAuth()

    // const handleRegister = event => {
    //     event.preventDefault()
    //     const form = event.target
    //     const name = form.name.value;
    //     const email = form.email.value;
    //     const password = form.password.value;

    //

    // }


    return (

        <>
            <Helmet><title>Bistro Boss || Sign Up</title></Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row md:w-3/4">
                    <div className="text-center lg:text-left hidden lg:flex">
                        <img src={img} alt="" />
                    </div>

                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <h1 className="text-3xl font-bold text-center mt-6">Sign Up now!</h1>

                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register("name", { required: true })} type="text" placeholder="name" className="input input-bordered" name="name" />

                                {errors.name && <span className='text-red-600' >Name is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" name="email" />
                                {errors.email && <span className='text-red-600' >Email is required</span>}

                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
                                })} type="password" placeholder="password" className="input input-bordered" name="password" />

                                {errors.password?.type === "required" && (
                                    <p role="alert" className='text-red-600'>Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p role="alert" className='text-red-600'>Password must be 6 characters</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p role="alert" className='text-red-600'>Password must be less then 20 characters</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p role="alert" className='text-red-600'>Password must have one Uppercase, one Lowercase, one Number and one special character.</p>
                                )}



                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>


                            <div className="form-control">
                                <input className="btn btn-outline text-white bg-[#D1A054]" type="submit" value="Sign Up" />
                            </div>

                            <p className='text-sm text-center text-[#D1A054]'> Already registered ? <Link to={"/login"} className='btn-link text-[#D1A054]'>Go to Login</Link> </p>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;