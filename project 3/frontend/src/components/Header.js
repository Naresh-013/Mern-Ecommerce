import React from 'react';
import { IoSearch } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';

const Header = () => {
    const user = useSelector(state => state?.user?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const fetchData = await fetch('http://localhost:8080/api/userLogout', {
                method: 'GET',
                credentials: 'include'
            });

            const data = await fetchData.json();

            if (data.success) {
                toast.success(data.message);
                dispatch(setUserDetails(null));
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error during logout:', error);
            toast.error('Error during logout');
        }
    };

    return (
        <header className='h-32 bg-blue-200 sticky top-0 z-[20] shadow-md'>
            <div className='h-full container flex flex-wrap items-center justify-between px-4 md:px-8'>
                <div className='flex-shrink-0'>
    
                </div>
                <div className='flex items-center w-full max-w-md md:max-w-lg lg:max-w-xl border rounded-full focus-within:shadow-md pl-2'>
                    <input type='text' placeholder='search product here' className='w-full outline-none' />
                    <div className='text-lg min-w-9 h-7 bg-black flex items-center justify-center rounded-r-full'>
                        <IoSearch color='white' />
                    </div>
                </div>
                <div className='flex items-center gap-2 md:gap-5'>
                    <button className='bg-green-200 rounded w-12 h-9'>
                        <Link to='./Sell'>Sell</Link>
                    </button>
                    <button className='bg-green-200 rounded w-12 h-9'>
                        <Link to='./Rent'>Rent</Link>
                    </button>
                    <div className='text-3xl cursor-pointer relative flex justify-center'>
                        <Link to='/user-details'>
                            {
                                user?.profilePic ? (
                                    <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                                ) : (
                                    <FaUserCircle />
                                )
                            }
                        </Link>
                    </div>
                    <div>
                        {
                            user?._id ? (
                                <button onClick={handleLogout} className='px-3 py-1 bg-transparent text-black underline rounded-full'>Logout</button>
                            )
                                : (
                                    <Link to={"/login"} className='px-3 py-1 bg-transparent text-black underline rounded-full'>Login</Link>
                                )
                        }
                    </div>
                    <div className='text-2xl relative'>
                        <span><FaCartPlus /></span>
                        <div className='bg-black text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                            <p className='text-xs'>0</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
