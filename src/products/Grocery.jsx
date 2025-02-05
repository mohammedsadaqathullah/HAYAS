import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './grocery.css';
import Navbar from '../navbar/NavBar';

const Grocery = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState({
        name: '',
        phone: '',
        street: '',
        area: '',
        defaultAddress: 'Eruvadi, Tirunelveli District - 627103',
    });

    // Load address from localStorage when the component mounts
    useEffect(() => {
        const savedAddress = localStorage.getItem('address');
        if (savedAddress) {
            setAddress(JSON.parse(savedAddress));  // Set the address state from localStorage
        }
    }, []);  // Empty dependency array to run once on mount

    // Update localStorage whenever the address changes
    useEffect(() => {
        if (address.name || address.phone || address.street || address.area) {
            localStorage.setItem('address', JSON.stringify(address));  // Save address to localStorage
        }
    }, [address]);  // Runs every time address state changes

    useEffect(() => {
        fetch('https://hayas-backend.onrender.com/grocery')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const cartData = await localStorage.getItem('cart');
                if (cartData) {
                    setCart(JSON.parse(cartData));
                }
            } catch (error) {
                console.error('Error loading cart:', error);
            }
        };
        loadCart();
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            saveCartToStorage(cart);
        }
    }, [cart]);

    const saveCartToStorage = async (updatedCart) => {
        try {
            await localStorage.setItem('cart', JSON.stringify(updatedCart));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    };

    const handleUpdateQuantity = (product, quantityType, action) => {
        const quantity = quantityType === 'One' ? product.quantityOne : product.quantityTwo;

        setCart((prevCart) => {
            const productInCart = prevCart.find(
                (item) => item._id === product._id && item.quantityType === quantityType
            );

            if (productInCart) {
                const newCount = action === 'increase' ? productInCart.count + 1 : Math.max(productInCart.count - 1, 0);

                const updatedCart = newCount === 0
                    ? prevCart.filter((item) => item._id !== product._id || item.quantityType !== quantityType)
                    : prevCart.map((item) =>
                        item._id === product._id && item.quantityType === quantityType
                            ? { ...item, count: newCount }
                            : item
                    );

                saveCartToStorage(updatedCart);
                return updatedCart;
            } else {
                return action === 'increase'
                    ? [...prevCart, { ...product, quantityType, quantity, count: 1 }]
                    : prevCart;
            }
        });
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePlaceOrder = () => {
        if (!address.name || !address.phone || !address.street || !address.area) return;

        const message = `*Order Details*\n\n` +
            cart.map((item) => `${item.title} - ${item.count} \n\n`).join('') +
            `\n*Shipping Address*\n Name: ${address.name}\nPhone: ${address.phone}\nStreet: ${address.street}\nArea: ${address.area}\nPlace: ${address.defaultAddress}\n\n Delivery Charge Per Order : 30Rs`;

        const phone = '8220206483'; // WhatsApp number
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="grocery-body">
            <Navbar />
            <div className="grocery-container">
                <div className="grocery-head">
                    <h1 className="heading">Grocery Items</h1>
                </div>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search Item Here..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input"
                    />
                    <a href="#cart">
                        <div className="cart-logo-cont">
                            <FaShoppingCart size={30} color='white' />
                            {cart.length > 0 && <span className="cart-length">{cart.length}</span>}
                        </div>
                    </a>
                </div>

                <div className="grocery-boxes">
                    {loading ? (
                        <div>Loading...</div>
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div className="main-box" key={product._id}>
                                <div className="cards">
                                    <img src={product.imageURL} alt={product.title} className="product-image" />
                                    <h2 className="title">{product.title}</h2>
                                    <p className="description">{product.description}</p>

                                    {/* Render quantity containers for both quantity types */}
                                    <div className="quantity-container">
                                        <button
                                            onClick={() => handleUpdateQuantity(product, 'One', 'decrease')}
                                            className="button"
                                        >
                                            -
                                        </button>
                                        <span>{product.quantityOne}</span>

                                        <button
                                            onClick={() => handleUpdateQuantity(product, 'One', 'increase')}
                                            className="button"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="quantity-container">

                                        <button
                                            onClick={() => handleUpdateQuantity(product, 'Two', 'decrease')}
                                            className="button"
                                        >
                                            -
                                        </button>
                                        <span>{product.quantityTwo}</span>
                                        <button
                                            onClick={() => handleUpdateQuantity(product, 'Two', 'increase')}
                                            className="button"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
            </div>

            <div className="cart-file" id='cart'>
                <h3 className="cart-heading">Your Grocery Cart</h3>
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div className="card">
                                <p className="cart-item-text">{item.title}</p>
                                <p className="cart-item-text">
                                    {item.quantityType === 'One'
                                        ? ` ${item.quantityOne}`
                                        : ` ${item.quantityTwo}`}
                                </p>

                                <div className="count-container">
                                    <button
                                        onClick={() => handleUpdateQuantity(item, item.quantityType, 'decrease')}
                                        className="action"
                                    >
                                        -
                                    </button>
                                    <span className="count">{item.count}</span>
                                    <button
                                        onClick={() => handleUpdateQuantity(item, item.quantityType, 'increase')}
                                        className="action"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty</p>
                )}

                {cart.length > 0 && (
                    <form className="address-section" onSubmit={handlePlaceOrder}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={address.name}
                            onChange={(e) => setAddress({ ...address, name: e.target.value })}
                            className="address-input"
                            required
                        />
                        <input
                            type="number"
                            maxLength={10}
                            minLength={10}
                            value={address.phone}
                            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                            className="address-input"
                            placeholder="Phone Number"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Door No,Street name"
                            value={address.street}
                            onChange={(e) => setAddress({ ...address, street: e.target.value })}
                            className="address-input"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Area"
                            value={address.area}
                            onChange={(e) => setAddress({ ...address, area: e.target.value })}
                            className="address-input"
                            required
                        />
                        <input
                            type="text"
                            value={address.defaultAddress}
                            className="address-input"
                            disabled
                        />
                        <button
                            className="place-order-btn"
                            disabled={!address.name || !address.phone || !address.street || !address.area}
                        >
                            {address.name && address.phone && address.street && address.area
                                ? 'Confirm Your Order'
                                : 'Fill all the details'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Grocery;
