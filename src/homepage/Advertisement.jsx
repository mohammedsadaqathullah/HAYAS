import React, { useState, useRef, useEffect } from 'react';
import video from '../Media/video.mp4';
import { IoPauseCircleOutline, IoVolumeMute, IoVolumeHigh } from "react-icons/io5";
import { RxResume } from "react-icons/rx";
// import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import imgOne from '../Media/shawarmaOffer.jpg'
import imgTwo from '../Media/aasifeOffer.jpg'
import bike from '../Media/bike.png'
import './advertisement.css';
import Products from '../products/Products';
import { Navigate, useNavigate } from 'react-router-dom';

const Advertisement = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [imgCountOne, setImgCountOne] = useState([0])
    const [imgCounttwo, setImgCounTwo] = useState([1])
    const videoRef = useRef(null);
    const navigate = useNavigate();

    const advertisementImages = ["https://i.postimg.cc/5y70JTLb/shawarma-Offer.jpg", "https://i.postimg.cc/cC4HV0KF/aasife-Offer.jpg"]

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play();
            setIsPlaying(true);
        }
    }, []);

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleRightClick = (e) => {
        e.preventDefault();
    };
    if (imgCountOne == 1 && imgCounttwo == 0) {
        setTimeout(() => {
            setImgCountOne([0])
            setImgCounTwo([1])
        }, 7000)
    } else {
        setTimeout(() => {
            setImgCountOne([1])
            setImgCounTwo([0])
        }, 7000)
    }
    const goToFood = () => {
        navigate('/food')
    }
    return (
        <div className='advertisementContainer'>
            <span className='one'>
                <div className='imageContainer'>
                    <img src={advertisementImages[imgCountOne] || imgOne} alt="Ad" />
                    {/* <div className='nextbtn'><MdNavigateNext size={20} /></div>
                    <div className='prevbtn'><MdNavigateBefore size={20} /></div> */}
                </div>
                <div className='gifContainer'>
                    <img src={bike} alt="icon" />
                </div>
            </span>
            <span className='two'>

                <video
                    ref={videoRef}
                    width="500"
                    controls={false}
                    loop
                    muted={isMuted}
                    onContextMenu={handleRightClick}
                >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="controls">
                    <button onClick={toggleMute}>
                        {isMuted ? <IoVolumeMute size={30} /> : <IoVolumeHigh size={30} />}
                    </button>
                    <button onClick={togglePlayPause}>
                        {isPlaying ? <IoPauseCircleOutline size={30} /> : <RxResume size={30} />}
                    </button>
                </div>
            </span>
            <span className='three'>
                <div className='imageContainer'>
                    <img src={advertisementImages[imgCounttwo] || imgTwo} alt="Ad" onClick={goToFood} />
                    {/* <div className='nextbtn'><MdNavigateNext size={20} /></div>
                    <div className='prevbtn'><MdNavigateBefore size={20} /></div> */}
                </div>
                <div className='gifContainer'>
                    <img src={bike} alt="icon" />
                </div>
            </span>
            <div className="productsCategory">
                <Products />
            </div>
        </div>
    );
};

export default Advertisement;
