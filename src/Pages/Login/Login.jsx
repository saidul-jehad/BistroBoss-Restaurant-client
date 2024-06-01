import { useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import useAuth from '../../Hooks/useAuth';

import img from '../../assets/others/authentication2.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import SocialGoogleLogin from '../../components/SocialLogin.jsx/SocialGoogleLogin';


const Login = () => {

    const [disable, setDisable] = useState(true)
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/';


    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])


    const handleLogin = event => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value;
        const password = form.password.value;


        // login user
        login(email, password)
            .then(() => {
                // console.log(result.user);
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
                        <SocialGoogleLogin></SocialGoogleLogin>

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
                                {/* DONE: disabled={disable} */}
                                <input disabled={disable} className="btn btn-outline text-white bg-[#D1A054]" type="submit" value="Login" />
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