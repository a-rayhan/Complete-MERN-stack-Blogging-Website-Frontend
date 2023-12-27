import { Link, Outlet } from 'react-router-dom';
import logo from '../imgs/logo.png';
import { useContext, useState } from 'react';
import { UserContext } from '../App';
import UserNavigationPanel from './user-navigation.component';

const Navbar = () => {

    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false)
    const [userNavigationPanel, setUserNavigationPanel] = useState(false)

    const { userAuth } = useContext(UserContext);

    const { access_token, profile_img } = userAuth;

    const handleUserNavPanel = () => {
        setUserNavigationPanel(currenVal => !currenVal)
    }

    const handleOnBlur = () => {
        setTimeout(() => {
            setUserNavigationPanel(false)
        }, 200)
    }

    console.log(userAuth);

    return (
        <>
            <nav className="navbar">

                <Link to='/' className="w-10 flex-none">
                    <img src={logo} alt="" className='w-full' />
                </Link>

                <div className={"absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " + (searchBoxVisibility ? "show" : "hide")}>
                    <input
                        type="text"
                        placeholder='Search'
                        className='w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12'
                    />

                    <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
                </div>

                <div className='flex items-center gap-3 md:gap-6 ml-auto'>
                    <button
                        onClick={() => setSearchBoxVisibility(currenVal => !currenVal)}
                        className='md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center'
                    >
                        <i className="fi fi-rr-search text-xl"></i>
                    </button>

                    <Link to="/editor" className='hidden md:flex gap-2 link'>
                        <i className="fi fi-rr-file-edit"></i>
                        <p>Write</p>
                    </Link>

                    {
                        access_token ?
                            <>
                                <Link to="/dashboard/notification">
                                    <button to="w-12 h-12 rounded-full relative hover:bg-black/10">
                                        <i className="fi fi-rr-bell text-2xl block mt-1"></i>
                                    </button>
                                </Link>

                                <div
                                    onClick={handleUserNavPanel}
                                    onBlur={handleOnBlur}
                                    className='relative'
                                >
                                    <button className='w-12 h-12 mt-1 border rounded-full'>
                                        <img src={profile_img} alt="" className='w-full h-full object-cover rounded-full' />
                                    </button>

                                    <div>
                                        {
                                            userNavigationPanel ?
                                                <UserNavigationPanel /> : ""
                                        }
                                    </div>
                                </div>
                            </> :
                            <>
                                <Link to="/signin" className='btn-dark py-2'>
                                    Sign In
                                </Link>

                                <Link to="/signup" className='btn-light py-2 hidden md:block'>
                                    Sign Up
                                </Link>
                            </>
                    }

                </div>

            </nav>

            <Outlet />
        </>
    );
};

export default Navbar;