import { Link } from 'react-router-dom';
import logo from '../imgs/logo.png';

const Navbar = () => {
    return (
        <nav className="navbar">

            <Link to='/' className="w-10 flex-none">
                <img src={logo} alt="" className='w-full' />
            </Link>

            <div className='absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw]'>
                <input
                    type="text"
                    placeholder='Search'
                    className='w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey'
                />
            </div>

        </nav>
    );
};

export default Navbar;