import React from "react";
import { Helmet } from "react-helmet-async";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import ElmTitle from "../components/ui/ElmTitle";
import SecTitle from "../components/ui/SecTitle";
import { blogs } from "../constant";

const Blogs = () => {
  return (
    <>
      <Helmet>
        <title>Blogs - Ronal Shelton</title>
      </Helmet>
      <section className="py-[190px_100px]">
        <div className="container">
          <div className="row gap-y-20">
            <div className="md:w-1/2">
              <SecTitle title="Blogs" tagline="Latest Blogs" className="mb-0" />
            </div>
            <div className="md:w-1/2 self-center">
              <div className="flex items-center justify-end">
                <div className="flex items-center justify-end h-12">
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-white px-4 py-2 border-r border-r-gray-200 h-full"
                  />
                  <button className="inline-flex justify-center items-center text-xl px-4 hover:text-white hover:bg-primary h-full text-primary bg-white">
                    <IoSearch />
                  </button>
                </div>
              </div>
            </div>
            {blogs.map((blog, idx) => (
              <div
                key={idx}
                className="w-full flex flex-col gap-5 items-center justify-center"
              >
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
                  fontsize="text-5xl px-4! font-gentium"
                  className="w-full"
                />
                <p className="line-clamp-4 mb-3 pl-4 text-lg">{blog.text}</p>
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blogs;
