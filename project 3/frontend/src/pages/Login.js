import React, { useState,useContext} from 'react';
import Header from '../components/Header';
import loginIcons from '../asset/sign-in.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate} from 'react-router-dom';
import SummaryApi from '../common';
import { ToastContainer, toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        mobile: ""
    });
    const navigate = useNavigate();
    
    

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        const dataRes = await fetch(SummaryApi.signIN.url, {
            method: SummaryApi.signIN.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const databack = await dataRes.json();

        if(databack.success){
            toast.success(databack.message)
            navigate('/')
            
            
        }
        if (databack.error) {
            toast.error(databack.message);
        }
    };

    return (
        <div>
            <>
                <ToastContainer />
                <Header />
                <section id="login" className='pt-16'>
                    <div className='mx-auto container p-4'>
                        <div className='bg-blue-200 p-2 w-full max-w-md mx-auto rounded'>
                            <div className='w-20 h-20 mx-auto'>
                                <img src={loginIcons} alt='login icons' />
                            </div>
                            <form className='pt-5 flex flex-col gap-2' onSubmit={handlesubmit}>
                                <div className="grid">
                                    <label>Email:</label>
                                    <div className='bg-slate-100 p-2'>
                                        <input
                                            type='email'
                                            placeholder='enter email'
                                            name='email'
                                            value={data.email}
                                            onChange={handleOnChange}
                                            className='w-full h-full outline-none bg-transparent'
                                        />
                                    </div>
                                </div>

                                <div className="grid">
                                    <label>Mobile Number:</label>
                                    <div className='bg-slate-100 p-2'>
                                        <input
                                            type='text'
                                            placeholder='enter mobile number'
                                            name='mobile'
                                            value={data.mobile}
                                            onChange={handleOnChange}
                                            className='w-full h-full outline-none bg-transparent'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label>Password:</label>
                                    <div className='bg-slate-100 p-2 flex'>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder='enter password'
                                            value={data.password}
                                            name='password'
                                            onChange={handleOnChange}
                                            className='w-full h-full outline-none bg-transparent'
                                        />
                                        <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                                            <span>
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </span>
                                        </div>
                                    </div>
                                    <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-blue-600'>
                                        Forgot password
                                    </Link>
                                </div>
                                <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                            </form>
                            <p className='my-5'>Don't have an account? <Link to={"/sign-up"} className='text-blue-600 hover:text--700 hover:underline'>Sign up</Link></p>
                        </div>
                    </div>
                </section>
            </>
        </div>
    );
};

export default Login;
