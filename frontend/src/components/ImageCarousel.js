import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Mousewheel} from 'swiper/modules';
import 'swiper/css';

const ImageCarousel = ({images}) => {
    if (!images || images.length === 0) return null;

    return (
        <Swiper
            modules={[Mousewheel]}
            loop={true}
            mousewheel={true}
            grabCursor={true}
            spaceBetween={10}
            slidesPerGroup={1}
            loopAdditionalSlides={3}
            slidesPerView="auto"
            style={{width: '100%', height: '400px'}}
        >
            {images.map((img, index) => (
                <SwiperSlide
                    key={index}
                    style={{
                        width: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        src={img.url}
                        alt={img.alt || `Image ${index + 1}`}
                        style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                            display: 'block'
                        }}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ImageCarousel;
