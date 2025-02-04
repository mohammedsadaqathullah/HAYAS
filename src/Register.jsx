// Register.js (React.js)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // for navigation in React.js
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase'; // Assuming firebase.js is in the same directory
import logoWhite from './Media/logoWhite.png'
import './register.css'; // Import the external CSS for styling

const Register = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // React Router for navigation

    const handleRegister = () => {
        setError('');
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User registered:', user);
                navigateToHome();
                setError('');
            })
            .catch((error) => {
                const errorCode = error.code;
                console.error(errorCode);
                setError(errorCode);
            });
        setEmail('');
        setPassword('');
    };

    const navigateToHome = () => {
        navigate('/Homepage'); // React Router to navigate to Home
    };

    const navigateToLogin = () => {
        navigate('/'); // React Router to navigate to Login page
    };

    return (
        <div className="registerContainer">
            <div>

                <img src={logoWhite} alt="Logo" className="logo" />
            </div>
            <input
                type="email"
                className={`inputs ${isFocused ? 'inputFocussed' : ''}`}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <input
                type="password"
                className={`inputs ${isFocused ? 'inputFocussed' : ''}`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <button className="button" onClick={handleRegister}>
                Register
            </button>
            {error && <p className="errorCode">{error}</p>}
            <p className="redirect" onClick={navigateToLogin}>
                Click here to log in
            </p>
        </div>
    );
};

export default Register;
