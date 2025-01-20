import React, { useEffect, useState, useRef } from 'react';
import Layer from './Layer';
import image1 from "../assests/image-2.jpg";

const ParallaxContainer = () => {
    const containerRef = useRef(null);

    const line1Ref = useRef(null);  // Reference to the first set of images (line 1)
    const line2Ref = useRef(null);  // Reference to the second set of images (line 2)

    useEffect(() => {
        const handleScroll = (e) => {
          if (line1Ref.current && line2Ref.current) {
            // For line 1 (scroll upwards when scrolling down)
            line1Ref.current.scrollTop -= e.deltaY;
    
            // For line 2 (scroll downwards when scrolling down)
            line2Ref.current.scrollTop += e.deltaY;
    
            // Prevent default scrolling behavior
            e.preventDefault();
          }
        };
    
        // Attach scroll event listener
        window.addEventListener("wheel", handleScroll, { passive: false });
    
        // Set initial scroll position for line 2 to show the last div
        if (line2Ref.current) {
          const scrollHeight = line2Ref.current.scrollHeight; // Total height of scrollable content
          const clientHeight = line2Ref.current.clientHeight; // Visible height of the container
          line2Ref.current.scrollTop = scrollHeight - clientHeight; // Set scroll position to bottom
        }
    
        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener("wheel", handleScroll);
        };
      }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            Array.from(containerRef.current.children).forEach((layer, index) => {
                const depth = (index + 1) * 20; // Adjust depth per layer
                layer.style.transform = `translateY(${scrollY / depth}px)`;
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const horizontalScrollRef = useRef(null);

    useEffect(() => {
        const handleScroll = (e) => {
            if (horizontalScrollRef.current) {
                // Get current scroll position and content width
                const scrollLeft = horizontalScrollRef.current.scrollLeft;
                const scrollWidth = horizontalScrollRef.current.scrollWidth;
                const clientWidth = horizontalScrollRef.current.clientWidth;

                // Reverse the direction of scrolling
                const delta = e.deltaY * -1;

                // Prevent scrolling past the end of the content
                if (scrollLeft + delta >= scrollWidth - clientWidth) {
                    horizontalScrollRef.current.scrollLeft = scrollWidth - clientWidth;
                } else if (scrollLeft + delta <= 0) {
                    horizontalScrollRef.current.scrollLeft = 0;
                } else {
                    // Apply normal horizontal scroll
                    horizontalScrollRef.current.scrollLeft += delta;
                }
            }
        };

        // Attach the scroll event listener
        window.addEventListener("wheel", handleScroll, { passive: true });

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, []);

    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const toggleOverlay = () => {
        console.log("Sidebar clicked!");
        setIsOverlayVisible(!isOverlayVisible);
    };

    return (
        <div className="relative " ref={containerRef}>
            <Layer className="bg-gray1  min-h-screen overflow-hidden" style={{ zIndex: 1 }}>
            </Layer>
            <Layer className="min-h-screen" style={{ zIndex: 2 }}>
                <div className="absolute flex gap-[90px] ml-[160px] overflow-hidden">
                    {/* Line 1: Images move up on scroll down */}
                    <div
                        ref={line1Ref}
                        className="flex flex-col gap-[120px] pt-[200px] overflow-y-auto max-h-screen scrollbar-none"
                    >
                        {Array(4)
                            .fill(0)
                            .map((_, index) => (
                                <div key={index}>
                                    <img
                                        src={image1}
                                        alt={`Image-${index + 1}`}
                                        className="w-[420px] h-[410px] opacity-60"
                                    />
                                </div>
                            ))}
                    </div>

                    {/* Line 2: Images move down on scroll down */}
                    <div
                        ref={line2Ref}
                        className="flex flex-col gap-[120px] pb-[200px] overflow-y-auto max-h-screen scrollbar-none"
                    >
                        {Array(4)
                            .fill(0)
                            .map((_, index) => (
                                <div key={index}>
                                    <img
                                        src={image1}
                                        alt={`Image-${index + 8}`}
                                        className="w-[420px] h-[420px] opacity-60"
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </Layer>

            <Layer className="min-h-screen" style={{ zIndex: 3 }}>
                <div className="absolute flex justify-between items-center p-10 text-white">
                    <div className="text-xl font-bold">
                        <h1>Logo</h1>
                    </div>
                    <div className=" relative text-lg font-medium left-[1080px]">
                        <button onClick={toggleOverlay} className="text-2xl " >Sidebar</button>
                    </div>

                    {isOverlayVisible && (
                        <div className="fixed inset-0 z-50 bg-gray1 text-gray-300">
                            {/* Close Button */}
                            <button
                                className="absolute top-5 left-5 text-xl font-bold"
                            >
                                LOGO
                            </button>
                            <button
                                onClick={toggleOverlay}
                                className="absolute top-5 right-5 text-3xl text-gray-500 hover:text-white"
                            >
                                &times;
                            </button>

                            {/* Overlay Content */}
                            <div className="grid grid-cols-2 mt-5  gap-[400px] justify-center h-full px-[120px] ">
                                {/* Left Section */}
                                <div className="text-left mt-20 pl-10  ">
                                    <p className="text-[80px] leading-none italic font-thin hover:text-blue-500">WEBSITE</p>
                                    <p className="text-[80px] leading-none italic font-thin hover:text-blue-500">SOCIAL</p>
                                    <p className="text-[80px] leading-none italic font-thin hover:text-blue-500">FILMS</p>
                                    <p className="text-[80px] leading-none italic font-thin hover:text-blue-500">3D</p>
                                    <p className="text-[80px] leading-none italic font-thin hover:text-blue-500">LAB</p>
                                </div>

                                {/* Right Section */}
                                <div className=" text-left text-6xl font-thin">
                                    <ul className="">
                                        <li className="text-gray2 hover:underline hover:text-white">About</li>
                                        <li className="text-gray2 hover:underline hover:text-white">Jobs</li>
                                        <li className="text-gray2 hover:underline hover:text-white">Contact</li>
                                        <li className="text-gray2 hover:underline hover:text-white">Stories</li>
                                        <li className="text-gray2 hover:underline hover:text-white">Newsletter</li>
                                    </ul>

                                    <div className="mt-10 space-y-2 text-sm text-gray-400">
                                        <p className="text-gray2 hover:underline hover:text-white">Facebook</p>
                                        <p className="text-gray2 hover:underline hover:text-white">LinkedIn</p>
                                        <p className="text-gray2 hover:underline hover:text-white">Twitter</p>
                                        <p className="text-gray2 hover:underline hover:text-white">Instagram</p>
                                    </div>

                                    <div className="mt-12 text-base">
                                        <p className="text-lg"><b>ITA </b>  ENG</p>
                                        <p className="mt-5">P.IVA IT02552210235</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div
                    ref={horizontalScrollRef}
                    className="flex gap-[170px] items-center justify-start pl-[470px] pr-[580px] mt-[220px] overflow-x-auto overflow-y-hidden scrollbar-none"
                >
                    <div>
                        <span className="text-gray2 hover:text-white text-[90px] font-thin">WEBSITE</span>
                    </div>
                    <div>
                        <span className="text-gray2 hover:text-gray-300 text-[90px] font-thin">SOCIAL</span>
                    </div>
                    <div>
                        <span className="text-gray2 hover:text-gray-300 text-[90px] font-thin">FILMS</span>
                    </div>
                    <div>
                        <span className="text-gray2 hover:text-gray-300 text-[90px] font-thin">3D</span>
                    </div>
                    <div>
                        <span className="text-gray2 hover:text-gray-300 text-[90px] font-thin">LAB</span>
                    </div>
                </div>
            </Layer>
        </div>
    );
};

export default ParallaxContainer;
