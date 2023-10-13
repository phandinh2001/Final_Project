import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
interface Props {
  slideImg: any;
  url: string;
  size?: number;
  navigation?: boolean;
}
const Slider = ({ slideImg, url, size = 50, navigation = false }: Props) => {

  return (
    <div style={{ width: `${size}px` }}>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        loop={true}
        navigation={navigation}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slideImg &&
          slideImg.map((img, index) => {
            return (
              <SwiperSlide key={index}>
                <img
                  src={`${url}${img}`}
                  alt="img"
                  width={size}
                  height={size}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default Slider;
