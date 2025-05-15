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
        <div className="row">
          <div className="md:w-4/12">
            <h3 className="text-primary sptitle first-letter:p-[0_24px] first-letter:-mr-6 first-letter:border-gray-400 first-letter:text-gray-200 text-3xl">
              ronald shelton
            </h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Similique accusamus asperiores odio molestias repellat quam
              inventore labore laborum veniam enim?
            </p>
          </div>
          <div className="md:w-4/12">
            <div className="text-center">
              <h5 className="text-primary text-xl">Quick Links</h5>
              <ul className="flex flex-col gap-2 uppercase tracking-widest font-gentium">
                {navigation.map((item, index) => (
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
            <div className="text-center">
              <h5 className="text-primary text-xl">Newsletter & Updates</h5>
              <form className="w-full max-w-[27.5rem]">
                <div className="relative flex items-center border border-gray-700 p-1 has-focus:border-primary has-focus:shadow-[0_0_0_0.1875rem_rgba(255,255,255,0.1)]">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    className="outline-none grow basis-0 w-auto border-none shadow-none h-10 text-white px-[17px] inline-flex items-center text-sm tracking-wider leading-0"
                  />
                  <Button className="text-sm px-5 py-2.5 hover:text-white">
                    Subscribe
                  </Button>
                </div>
              </form>
            </div>
            <div className="text-center mt-10">
              <h5 className="text-primary text-xl">Follow me on:</h5>
              <ul className="flex items-center justify-center gap-3">
                {socials.map((social, idx) => {
                  const Icon = social.icon;
                  const icolor = social.color.startsWith("#")
                    ? social.color
                    : "#dc2743";
                  const hoverStyle = { color: icolor };
                  const baseStyle = { background: social.color };
                  return (
                    <li key={idx} className="relative">
                      <Link
                        to={social.href}
                        onMouseEnter={() => setIsHover(social.name)}
                        onMouseLeave={() => setIsHover(null)}
                        className={`overflow-hidden relative w-11 h-11 flex items-center justify-center text-xl after:absolute after:inset-0 after:bg-white after:translate-y-full after:transition-all after:duration-200 after:ease-linear hover:after:translate-y-0`}
                        style={{
                          ...baseStyle,
                          ...(isHover === social.name
                            ? hoverStyle
                            : { color: "#fff" }),
                        }}
                      >
                        <Icon className="relative z-[1]" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="row mt-10 pt-8 border-t border-t-gray-900">
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
