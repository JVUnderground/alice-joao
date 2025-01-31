'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Swipeable from '../behaviors/swipeable';

interface CarouselProps {
    images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const lastSlideTimeRef = useRef(Date.now());
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        lastSlideTimeRef.current = Date.now();
    }, [images.length]);

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
            className="relative w-full max-w-[992px] h-[300px] md:h-[400px] overflow-hidden flex justify-center items-center mx-auto"
            onTouchStart={handleTouchStart}
            onTouchMove={swipeable.handleTouchMove}
            onTouchEnd={swipeable.handleTouchEnd}
            style={{ marginTop: 40}}
        >
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${images.length * 100}%`, height: '100%' }}
            >
                {images.map((image, index) => (
                    <div key={index} className="relative w-full h-full flex-shrink-0">
                        <Image
                            src={image}
                            alt={`Slide ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            draggable={false}
                        />
                    </div>
                ))}
            </div>

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
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all ${
                            index === currentIndex ? 'bg-white scale-110' : 'bg-gray-400'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
