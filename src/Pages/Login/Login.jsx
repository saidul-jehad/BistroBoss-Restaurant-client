import { useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import useAuth from '../../Hooks/useAuth';

import img from '../../assets/others/authentication2.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';


const Login = () => {

    const [disable, setDisable] = useState(true)
    const { login, googleLogin } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/';


    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    // google login
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result.user);
                toast.success("Login Success")
                navigate(from, { replace: true })
            })
            .catch(err => console.log(err))
    }


    const handleLogin = event => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value;
        const password = form.password.value;


        // login user
        login(email, password)
            .then(result => {
                console.log(result.user);
                toast.success("Login Success")
                navigate(from, { replace: true })
            })
            .catch(err => console.log(err))
    }

    const handleValidateCaptcha = (e) => {
        const captchaValue = e.target.value;
        if (validateCaptcha(captchaValue)) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }

    return (
        <>
            <Helmet><title>Bistro Boss || Login</title></Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row md:w-3/4">
                    <div className="text-center lg:text-left hidden lg:flex">
                        <img src={img} alt="" />
                    </div>

                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <h1 className="text-3xl font-bold text-center mt-6">Login now!</h1>

                        <div className=' w-full pt-8 px-8 '>
                            <a onClick={handleGoogleLogin} className="flex cursor-pointer items-center justify-center mt-4 text-gray-900 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <div className="px-2 py-2">
                                    <svg className="w-6 h-6" viewBox="0 0 40 40">
                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                        <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                        <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                                    </svg>
                                </div>
                                <span className="w-5/6 px-4 py-3 font-bold text-black hover:text-white text-center">Sign in with Google</span>
                            </a>

                            <div className="flex items-center justify-between mt-4">
                                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                                <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or login
                                    with email</a>

                                <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                            </div>
                        </div>

                        <form className="card-body" onSubmit={handleLogin}>
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

                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>

                                <input onBlur={handleValidateCaptcha} type="text" placeholder="type the captcha above" className="input input-bordered" required name="captcha" />

                            </div>
                            <div className="form-control mt-2">
                                {/* TODO: disabled={disable} */}
                                <input disabled={false} className="btn btn-outline text-white bg-[#D1A054]" type="submit" value="Login" />
                            </div>

                            <p className='text-sm text-center text-[#D1A054]'>New here ? <Link to={"/register"} className='btn-link text-[#D1A054]'>Create a New Account</Link> </p>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;