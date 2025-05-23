import { useState } from "react";
import { Link } from "react-router-dom";
import { pattern_3 } from "../../assets";
import { navigation, socials } from "../../constant";
import Button from "../ui/Button";

const Footer = () => {
  const [isHover, setIsHover] = useState(null);
  return (
    <footer
      className="bg-gray-950 relative text-gray-300 pt-20 pb-4 bg-blend-color-burn"
      style={{ backgroundImage: `url(${pattern_3})` }}
    >
      <div className="container">
        <div className="row justify-between before:hidden after:hidden">
          <div className="md:w-4/12">
            <h3 className="text-white sptitle first-letter:p-[0_24px] first-letter:-mr-6 first-letter:border-primary first-letter:text-primary text-3xl">
              ronald shelton
            </h3>
            <p className="text-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Similique accusamus asperiores odio molestias repellat quam
              inventore labore laborum veniam enim?
            </p>
          </div>
          <div className="md:w-2/12">
            <div className="text-center">
              <h5 className="text-white text-xl">Quick Links</h5>
              <ul className="flex flex-col gap-2 uppercase tracking-widest font-gentium">
                {navigation.slice(1).map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.href}
                      className="relative inline-block overflow-hidden after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:text-white after:ease-linear after:-translate-x-full hover:after:translate-x-0"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:w-4/12">
            <div className="text-left">
              <h5 className="text-white text-xl">Follow me</h5>
              <ul className="flex items-center justify-start gap-3 transition-all duration-200 ease-in-out">
                {socials.map((social, idx) => {
                  const Icon = social.icon;
                  const icolor = social.color.startsWith("#")
                    ? social.color
                    : "#dc2743";
                  const hoverStyle = { color: icolor };
                  const baseStyle = { background: "#fff" };
                  return (
                    <li key={idx} className="relative">
                      <Link
                        to={social.href}
                        onMouseEnter={() => setIsHover(social.name)}
                        onMouseLeave={() => setIsHover(null)}
                        className={`overflow-hidden relative w-11 hover:w-32 h-11 flex items-center justify-center text-xl group transition-all duration-500 ease-in-out`}
                        style={{
                          ...baseStyle,
                          ...(isHover === social.name
                            ? { color: "#fff" }
                            : hoverStyle),
                        }}
                      >
                        <span
                          className={`absolute inset-0 -translate-x-full transition-all duration-200 ease-linear group-hover:translate-x-0`}
                          style={{ background: `${social.color}` }}
                        />
                        <Icon className="absolute z-[1] top-1/2 -translate-1/2 left-1/2 group-hover:opacity-15 group-hover:text-4xl transition-all duration-200 ease-in-out" />
                        <span className="relative z-[1] text-lg [text-shadow:0_2px_5px_rgb(0_0_0_/_0.5)] tracking-widest capitalize text-white font-semibold font-gentium opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                          {social.name}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="text-left mt-10">
              <h5 className="text-white text-xl">Newsletter</h5>
              <form className="w-full max-w-[27.5rem]">
                <div className="relative flex items-center border border-gray-700 p-1 has-focus:border-primary has-focus:shadow-[0_0_0_0.1875rem_rgba(255,255,255,0.1)]">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    className="outline-none grow basis-0 w-auto border-none shadow-none h-10 text-white px-[17px] inline-flex items-center text-sm tracking-wider leading-0"
                  />
                  <Button className="text-sm px-4 py-2.5 hover:text-white">
                    Subscribe
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row mt-20 pt-4 border-t border-t-gray-900">
          <p className="text-center mb-0 text-gray-400 tracking-widest font-gentium">
            &copy; {new Date().getFullYear()}{" "}
            <Link
              to="/"
              className="uppercase text-sm text-gray-200 underline underline-offset-2 decoration-transparent hover:text-primary hover:decoration-primary decoration-[0.5px]"
            >
              Ronald Shelton
            </Link>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
