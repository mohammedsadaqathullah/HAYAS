import React, { useEffect, useRef, useState } from 'react';
import Navbar from './navbar/NavBar';
import logoBlack from './Media/logoBlack.png'
import whatsapp from './Media/whatsapp.png'
import instagram from './Media/instagram.png'
import './about.css'; // Import the CSS file where styles and animations are handled

const About = () => {
    const fullText = `HAYAS is a trusted local food and grocery delivery service, proudly serving the communities of Eruvadi and the surrounding areas in Tirunelveli District. 
     Founded in 2020, we have made it our mission to bring fresh, quality food and essential groceries directly to your doorstep, all for a flat delivery fee of just ₹30 per order.
    Whether you're craving a delicious meal or need to stock up on groceries, HAYAS is here to provide fast, reliable, and affordable delivery services to make your life easier.
     Our team is committed to delivering your orders with care and convenience, ensuring that you can enjoy your favorite foods and essentials without leaving the comfort of your home.
    Thank you for choosing HAYAS. We’re here to serve you with a smile, every time!`;

    const lines = fullText.split('\n');

    const [customerCountState, setCustomerCountState] = useState(0);
    const [deliveryCountState, setDeliveryCountState] = useState(0);
    const statsRef = useRef(null); // Ref for the stats section

    // Function to start counter animation with setInterval
    const startCounterAnimation = () => {
        const customerInterval = setInterval(() => {
            setCustomerCountState((prevValue) => {
                if (prevValue < 1000) {
                    return prevValue + 10;
                } else {
                    clearInterval(customerInterval);
                    return 1000;
                }
            });
        }, 10);

        const deliveryInterval = setInterval(() => {
            setDeliveryCountState((prevValue) => {
                if (prevValue < 8000) {
                    return prevValue + 10;
                } else {
                    clearInterval(deliveryInterval);
                    return 8000;
                }
            });
        }, 10);
    };

    // Set up IntersectionObserver when component mounts
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // If stats section is in view, start the animation
                if (entries[0].isIntersecting) {
                    startCounterAnimation();
                }
            },
            { threshold: 0.5 } // Trigger the observer when 50% of the stats section is visible
        );

        if (statsRef.current) {
            observer.observe(statsRef.current); // Start observing the stats section
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current); // Clean up observer on unmount
            }
        };
    }, []);

    return (
        <>
            <div className="nav">
                <Navbar />
            </div>
            <div className="container">
                <div className="imageCont">
                    <div className="logo">
                        <img className="blackLogo" src={logoBlack} alt="HAYAS Logo" />
                    </div>
                </div>
                <div className="aboutContent">
                    {lines.map((line, index) => (
                        <div key={index} className="aboutText" style={{ animationDelay: `${index * 1}s` }}>
                            {line}
                        </div>
                    ))}
                </div>

                {/* Counters section */}
                <div
                    className="statsContainer"
                    ref={statsRef} // Add ref to this div
                >
                    <div className="statsText">
                        {customerCountState} <span className="statsSubtitle">+ Customers</span>
                    </div>
                    <div className="statsText">
                        {deliveryCountState} <span className="statsSubtitle">+ Deliveries</span>
                    </div>
                </div>

                <div className="lastBox">
                    <div>
                        <p className="Contact">Contact us</p>
                    </div>
                    <div className="socialContainer">
                        <a href="https://wa.me/8220206483" target="_blank" rel="noopener noreferrer">
                            <img className="whatsapp" src={whatsapp} alt="WhatsApp" />
                        </a>
                        <a href="https://instagram.com/hayas2k20?igsh=MWhwazJ50DNh0TRheg==" target="_blank" rel="noopener noreferrer">
                            <img className="instagram" src={instagram} alt="Instagram" />
                        </a>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="contactInfo">
                    <p className="contactText">Code by Mohammed Sadaqathullah</p>
                    <p className="contactText">Contact: 8220206483</p>
                    <p className="contactText">Email: mdsadaq.fed@gmail.com</p>
                    <a href="https://md-sadaq-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer">
                        <p className="contactTextWeb">Website: md-sadaq</p>
                    </a>
                </div>
            </div>
        </>
    );
};

export default About;