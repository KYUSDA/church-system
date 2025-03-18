import { useState } from 'react';
import { LazyLoadImage, trackWindowScroll, ScrollPosition } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleChevronLeft,
    faCircleChevronRight,
    faCircleXmark
} from '@fortawesome/free-solid-svg-icons';

import './Gallery.css';

interface GalleryProps {
    galleryImages: { img: string }[];
    scrollPosition: ScrollPosition;
}

const Gallery: React.FC<GalleryProps> = ({ galleryImages, scrollPosition }) => {
    const [slideNumber, setSlideNumber] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = (index: number) => {
        setSlideNumber(index);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const prevSlide = () => {
        setSlideNumber(slideNumber === 0 ? galleryImages.length - 1 : slideNumber - 1);
    };

    const nextSlide = () => {
        setSlideNumber(slideNumber + 1 === galleryImages.length ? 0 : slideNumber + 1);
    };

    return (
        <div>
            {openModal && (
                <div className="sliderWrap fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50">
                    <FontAwesomeIcon icon={faCircleXmark} className="btnClose absolute top-5 right-5 text-white text-3xl cursor-pointer" onClick={handleCloseModal} />
                    <FontAwesomeIcon icon={faCircleChevronLeft} className="btnPrev text-white text-4xl absolute left-5 cursor-pointer" onClick={prevSlide} />
                    <FontAwesomeIcon icon={faCircleChevronRight} className="btnNext text-white text-4xl absolute right-5 cursor-pointer" onClick={nextSlide} />
                    <div className="fullScreenImage max-w-4xl max-h-[80vh] flex justify-center">
                        <LazyLoadImage
                            src={galleryImages[slideNumber].img}
                            alt=""
                            effect="blur"
                            loading="lazy"
                            className="object-contain w-full h-full"
                        />
                    </div>
                </div>
            )}

            {/* Responsive Grid Layout */}
            <div className="galleryWrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {galleryImages.map((slide, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden cursor-pointer rounded-lg"
                        onClick={() => handleOpenModal(index)}
                    >
                        <LazyLoadImage
                            src={slide.img}
                            alt=""
                            effect="blur"
                            loading="lazy"
                            scrollPosition={scrollPosition}
                            className="object-cover w-full h-[200px] md:h-[250px] lg:h-[300px] rounded-md transition-all duration-500 ease-in-out hover:scale-105"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default trackWindowScroll(Gallery);