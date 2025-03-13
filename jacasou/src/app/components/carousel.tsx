'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Swipeable from '../behaviors/swipeable';
import styles from './carousel.module.css'

interface CarouselProps {
    images?: string[];
    imagesEndpoint?: string;
}

const Carousel: React.FC<CarouselProps> = ({ imagesEndpoint }) => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [loadedImages, setLoadedImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const lastSlideTimeRef = useRef(Date.now());
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                if (!imagesEndpoint) return
                const response = await fetch(imagesEndpoint);
                const data = await response.json();
                const urls = data.images.map((image: string) => `https://jalice-wedding-images.s3.amazonaws.com/${image}`);
                setImageUrls(urls);
                setLoadedImages(urls.slice(0, 3)); // Load the first 3 images initially
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [imagesEndpoint]);

    const preloadImages = useCallback((index: number) => {
        const nextImages: string[] = [];
        for (let i = 0; i < 3; i++) {
            const nextIndex = (index + i) % imageUrls.length;
            if (!loadedImages.includes(imageUrls[nextIndex])) {
                nextImages.push(imageUrls[nextIndex]);
            }
        }
        setLoadedImages((prevLoadedImages) => [...prevLoadedImages, ...nextImages]);
    }, [imageUrls, loadedImages]);


    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1;
            preloadImages(newIndex);
            return newIndex;
        });
    };

    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1;
            preloadImages(newIndex);
            return newIndex;
        });
        lastSlideTimeRef.current = Date.now();
    }, [imageUrls.length, preloadImages]);

    const swipeable = new Swipeable(goToNext, goToPrevious);

    const clearTimers = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const startAutoSlide = useCallback(() => {
        clearTimers();
        intervalRef.current = setInterval(() => {
            const now = Date.now();
            const elapsed = now - lastSlideTimeRef.current;

            if (elapsed >= 3000) {
                goToNext();
            }
        }, 1000);
    }, [goToNext]);

    const stopAutoSlide = useCallback(() => {
        clearTimers();
    }, []);

    useEffect(() => {
        lastSlideTimeRef.current = Date.now();
        startAutoSlide();

        return () => {
            clearTimers();
        };
    }, [startAutoSlide]);

    const handleTouchStart = (event: React.TouchEvent) => {
        stopAutoSlide();
        swipeable.handleTouchStart(event);
    };

    return (
        <div
            className="relative w-full max-w-[992px] h-[300px] md:h-[500px] overflow-hidden flex justify-center items-center mx-auto"
            onTouchStart={handleTouchStart}
            onTouchMove={swipeable.handleTouchMove}
            onTouchEnd={swipeable.handleTouchEnd}
        >
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${imageUrls.length * 100}%`, height: '100%' }}
            >
                {imageUrls.map((image, index) => (
                    <div key={index} className="relative w-full h-full flex-shrink-0">
                        {loadedImages.includes(image) ? (
                            <LazyImage
                                src={image}
                                alt={`Slide ${index + 1}`}
                            />
                        ) : (
                            <div className={`${styles.skeleton} w-full h-full`}></div>
                        )}
                    </div>
                ))}
            </div>
            { imageUrls.length == 0 && <div className={`${styles.skeleton} w-full h-full`}></div>}

            {/* Left arrow */}
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={() => {
                    stopAutoSlide();
                    goToPrevious();
                }}
            >
                ←
            </button>

            {/* Right arrow */}
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={() => {
                    stopAutoSlide();
                    goToNext();
                }}
            >
                →
            </button>

            {/* Dots */}
            {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {imageUrls.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all ${
                            index === currentIndex ? 'bg-white scale-110' : 'bg-gray-400'
                        }`}
                    />
                ))}
            </div> */}

            {/* Numeric Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
                {currentIndex + 1} / {imageUrls.length}
            </div>
        </div>
    );
};

const LazyImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative w-full h-full">
            <Image
                src={src}
                alt={alt}
                layout="fill"
                objectFit="cover"
                draggable={false}
                onLoad={() => setLoaded(true)}
            />
            {!loaded && <div className={`${styles.skeleton} w-full h-full`}></div>}
        </div>
    );
};

export default Carousel;
