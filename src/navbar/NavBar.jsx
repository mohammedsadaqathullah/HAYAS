import { useEffect, useState } from 'react';
import logo from '../Media/logoWhite.png';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import auth from '../../firebase';  // Make sure to import the auth instance
import './navbar.css';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            // Disable scrolling by setting overflow to 'hidden'
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable scrolling by setting overflow to 'auto'
            document.body.style.overflow = 'auto';
        }

        // Cleanup: reset the overflow property when the component is unmounted
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate('/'); // Redirect to login page after logout
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    };

    return (
        <nav className='navContainer'>
            <ul className='ulOne'>
                <li>
                    <Link to="/"> <img src={logo} alt="logo" /></Link>
                </li>
                <li className='hamburger' onClick={() => setIsOpen(!isOpen)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </li>
            </ul>
            <ul className='ulTwo' id={isOpen ? "showMenu" : "notShowMenu"}>
                <Link className='border' to="/" style={{ color: "rgb(250, 94, 146)", textDecoration: "none" }}> <li className='homeItem'>Home</li></Link>
                <Link className='border' to="/Grocery" style={{ textDecoration: "none", color: "rgb(250, 94, 146)" }}> <li>Order Grocery</li></Link>
                <Link className='border' to="/Food" style={{ textDecoration: "none", color: "rgb(250, 94, 146)" }}> <li>Order Food</li></Link>
                <Link className='border' to="/About" style={{ textDecoration: "none", color: "rgb(250, 94, 146)" }}> <li>About</li></Link>
                <li>
                    <button className='logout' onClick={handleLogout}>
                        Log out
                    </button>
                </li>
                <a href='https://expo.dev/artifacts/eas/mFJKV6vMWrwqLM9TQr8KU7.apk' target='_blank'>
                    <li><button className='downloadAPK'>Download Apk</button></li>
                </a>
            </ul>
        </nav>
    );
};

export default NavBar;
