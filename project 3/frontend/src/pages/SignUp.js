import React, { useState } from 'react';
import Header from '../components/Header';
import loginIcons from '../asset/sign-in.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { ToastContainer, toast } from 'react-toastify';
import imageTobase64 from '../helpers/imageTobase64';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPasword: "",
        profilePic: "",
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
    const handleUploadPic = async(e) =>{
        const file = e.target.files[0]
        const imagePic = await imageTobase64(file)
        

        console.log("imagePic",imagePic)
        setData((preve)=>{
            return{
              ...preve,
              profilePic : imagePic
            }
          })
    
      }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password === data.confirmPasword) {
            const dataResponse = await fetch(SummaryApi.signUP.url, {
                method: SummaryApi.signUP.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const databack = await dataResponse.json();

            if (databack.success) {
                toast.success(databack.message);
                navigate("/login");
            }

            if (databack.error) {
                toast.error(databack.message);
            }

        } else {
            toast.error("Please check password and confirm password");
        }
    };

    return (
        
            <>
                <ToastContainer />
                <Header />
                <section id="login" className='pt-4'>
                    <div className='mx-auto container p-4'>
                        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                            <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                            <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                                <img src={data.profilePic || loginIcons} alt='login icons' />
                            </div>
                            <form>
                           <label>
                            <div className='text-xs bg-opacity-80 bg-transparent pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                              Upload  Photo
                            </div>
                            <input type='file' className='hidden' onChange={handleUploadPic}/>
                           </label>
                           </form>
                           </div>
                           

                            <form className='pt-9 flex flex-col gap-4' onSubmit={handleSubmit}>
                                <div className="grid">
                                    <label>Name</label>
                                    <div className='bg-slate-100 p-2'>
                                        <input
                                            type='text'
                                            placeholder='enter your name'
                                            name='name'
                                            value={data.name}
                                            onChange={handleOnChange}
                                            required
                                            className='w-full h-full outline-none bg-transparent' />
                                    </div>
                                </div>

                                <div className="grid">
                                    <label>Email:</label>
                                    <div className='bg-slate-100 p-2'>
                                        <input
                                            type='email'
                                            placeholder='enter email'
                                            name='email'
                                            value={data.email}
                                            onChange={handleOnChange}
                                            required
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
                                            required
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
                                            required
                                            className='w-full h-full outline-none bg-transparent'
                                        />
                                        <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                                            <span>
                                                {
                                                    showPassword ? (
                                                        <FaEyeSlash />
                                                    ) : (
                                                        <FaEye />
                                                    )
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label>Confirm Password:</label>
                                    <div className='bg-slate-100 p-2 flex'>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder='enter confirm password'
                                            value={data.confirmPasword}
                                            name='confirmPasword'
                                            onChange={handleOnChange}
                                            required
                                            className='w-full h-full outline-none bg-transparent'
                                        />
                                        <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                            <span>
                                                {
                                                    showConfirmPassword ? (
                                                        <FaEyeSlash />
                                                    ) : (
                                                        <FaEye />
                                                    )
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign-Up</button>
                            </form>
                            <p className='my-5'>Already have an account? <Link to={"/login"} className='text-blue-600 hover:text-blue-700 hover:underline'>Login</Link></p>
                        </div>
                    </div>
                </section>
            </>
    );
};

export default SignUp;
