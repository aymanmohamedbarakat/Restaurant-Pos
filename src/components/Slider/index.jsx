import slider1 from "../../assets/imgs/Login/slide-1.png";
import slider2 from "../../assets/imgs/Login/slide-2.svg";
import slider3 from "../../assets/imgs/Login/slide-3.png";
import React from 'react'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react'
// Pagination
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import styles from "./index.module.css";


export default function Slider() {
    return (
        <Swiper
            id={styles.mySwiper}
            modules={[Pagination, Autoplay]}
            loop={true}
            spaceBetween={0}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
        >
            <SwiperSlide className={styles.slide}><img src={slider1} height={400} /></SwiperSlide>
            <SwiperSlide className={styles.slide}><img src={slider2} height={400} /></SwiperSlide>
            <SwiperSlide className={styles.slide}><img src={slider3} height={400} /></SwiperSlide>
            {/* <SwiperSlide className={styles.slide}>Slide 4</SwiperSlide> */}
        </Swiper>
    )
}
