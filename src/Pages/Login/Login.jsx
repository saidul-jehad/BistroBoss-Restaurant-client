import { useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import useAuth from '../../Hooks/useAuth';

import img from '../../assets/others/authentication2.png'
import { Link } from 'react-router-dom';


const Login = () => {
    const captchaRef = useRef()
    const [disable, setDisable] = useState(true)
    const { user, login } = useAuth()
    console.log(user);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])


    const handleLogin = event => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value;
        const password = form.password.value;


        console.log(email, password);
    }

    const handleValidateCaptcha = () => {
        const captchaValue = captchaRef.current.value;
        if (validateCaptcha(captchaValue)) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row md:w-3/4">
                <div className="text-center lg:text-left hidden lg:flex">
                    <img src={img} alt="" />
                </div>

                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-3xl font-bold text-center mt-6">Login now!</h1>
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
                            <input ref={captchaRef} type="text" placeholder="type the captcha above" className="input input-bordered" required name="captcha" />
                            <button onClick={handleValidateCaptcha} className='btn btn-outline btn-xs mt-2'>Validate</button>

                        </div>
                        <div className="form-control mt-6">
                            <button disabled={disable} className="btn btn-outline text-white bg-[#D1A054]">Login</button>
                        </div>

                        <p className='text-sm text-center text-[#D1A054]'>New here ? <Link to={"/register"} className='btn-link text-[#D1A054]'>Create a New Account</Link> </p>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;