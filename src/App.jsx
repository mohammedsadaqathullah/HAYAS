import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Homepage from './homepage/Homepage';
import Grocery from './products/Grocery';
import Food from "./products/Food";
import Login from './Login';
import Register from './Register';
import auth from '../firebase'; // Assuming this imports your firebase config
import './App.css';
import About from "./About";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if a user is logged in when the app loads
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the current user state
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  return (
    <>
      <Router>
        <Routes>
          {/* If user is logged in, redirect to homepage */}
          <Route path="/" element={user ? <Navigate to="/homepage" /> : <Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Homepage" element={user ? <Homepage /> : <Navigate to="/" />} />
          <Route path="/Grocery" element={<Grocery />} />
          <Route path="/Food" element={<Food />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
