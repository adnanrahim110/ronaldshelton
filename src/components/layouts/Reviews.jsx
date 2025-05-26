import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { reviews } from "../../constant";
import SecTitle from "../ui/SecTitle";

const Reviews = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="pb-[140px] relative">
      <div className="container">
        <div className="row">
          <div className="max-w-full text-center">
            <SecTitle title="Reviews" tagline="what people are saying" />
            <div className="lg:px-9 relative overflow-hidden">
              <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                onSwiper={setSwiperInstance}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="reviewSlider overflow-visible! cursor-pointer"
              >
                {reviews.map((review, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="text-center">
                      <div className="inline-block relative">
                        <div className="text-sm font-semibold tracking-wider uppercase text-gray-950 font-cinzel">
                          {review.author}
                        </div>
                        <span className="text-primary relative text-[13px] font-semibold tracking-wider">
                          {review.title}
                        </span>
                      </div>
                      <div className="relative pt-10 px-[4%] pb-[50px]">
                        <div className="text-base leading-relaxed font-gentium">
                          <p className="mb-0">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="relative font-gentium text-center">
                {reviews.map((_, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      onClick={() => swiperInstance?.slideTo(idx)}
                      key={idx}
                      className="inline-block cursor-pointer select-none"
                    >
                      <span
                        className={`block w-20 my-[5px] mx-3 transition-all duration-200 text-left text-[22px] pl-[3px] pb-[3px] border-b-[3px] ${
                          isActive ? "border-primary" : "border-[#ddd]"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
