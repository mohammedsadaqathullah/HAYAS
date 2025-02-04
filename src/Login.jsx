// Login.js (React.js)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation in React.js
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import auth from '../firebase'; // Assuming firebase.js is in the same directory
import logoWhite from './Media/logoWhite.png'
import './login.css'; // External CSS for styling

const Login = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // React Router for navigation

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/Homepage'); // Redirect to home if user is authenticated
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleLogin = () => {
        setLoading(true);
        setError('');

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User logged in:', user);
                setLoading(false);
                navigate('/Homepage');
            })
            .catch((error) => {
                setLoading(false);
                switch (error.code) {
                    case 'auth/invalid-email':
                        setError('Invalid email address.');
                        break;
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        setError('Invalid email or password.');
                        break;
                    default:
                        console.error(error);
                        setError('An error occurred. Please try again later.');
                }
            });


    };

    const navigateToRegister = () => {
        navigate('/register'); // React Router to navigate to Register page
    };

    return (
        <div className="loginContainer">
            <div>
                <img src={logoWhite} alt="Logo" className="logo" />
            </div>

            <input
                type="email"
                className={`inputs ${isFocused ? 'inputFocussed' : ''} ${error.includes('email') ? 'inputError' : ''}`}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                className={`inputs ${isFocused ? 'inputFocussed' : ''} ${error.includes('password') ? 'inputError' : ''}`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="button" onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Log in'}
            </button>

            {error && <p className="errorMessage">{error}</p>}

            <p className="redirect" onClick={navigateToRegister}>
                Register here to get started
            </p>
        </div>
    );
};

export default Login;
