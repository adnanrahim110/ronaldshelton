import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { blogs } from "../../constant";
import ElmTitle from "../ui/ElmTitle";
import SecTitle from "../ui/SecTitle";

const Posts = () => {
  return (
    <section className="relative pb-[100px]">
      <div className="container">
        <div className="row gap-y-10">
          <div className="w-full text-center">
            <SecTitle title="Latest Posts" />
          </div>
          <div className="w-full">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              autoplay={{ delay: 3000 }}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {blogs.slice(0, 4).map((blog, idx) => (
                <SwiperSlide key={idx}>
                  <div className="w-full flex flex-col gap-5 items-center justify-center">
                    <div className="relative">
                      <img
                        src={blog.img}
                        alt={blog.title}
                        className="w-full h-full min-h-56 object-cover"
                      />
                      <span className="absolute left-0 bottom-0 bg-white p-4">
                        <span className="border-b-[3px] border-dotted border-primary relative inline-block text-xs font-bold uppercase tracking-widest lg:tracking-[3px]">
                          {blog.date}
                        </span>
                      </span>
                    </div>
                    <ElmTitle
                      title={blog.title}
                      fontsize="text-[26px] px-4! font-gentium"
                      className="w-full"
                    />
                    <Link
                      to={blog.link}
                      className="flex items-center justify-end self-end uppercase text-primary hover:text-primary-600 font-semibold text-sm"
                    >
                      <div className="inline-flex items-center gap-2">
                        <span className="w-10 h-0.5 bg-primary" />
                        <span>Read More</span>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="text-right mt-5">
            <Link
              to="/blogs"
              className="flex items-center justify-end self-end  border-b border-b-primary-200 pb-5 uppercase text-primary hover:text-primary-600 font-semibold text-lg"
            >
              <div className="inline-flex items-center gap-2">
                <span className="w-10 h-0.5 bg-primary" />
                <span>Read All</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Posts;
