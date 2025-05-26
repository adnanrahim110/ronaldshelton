import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navigation } from "../../constant";
import { useCart } from "../../context/CartContext";
import Button from "../ui/Button";

const RenderLink = ({ item, onClickCallback }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAnchor = item.href.startsWith("#");
  const id = item.href.slice(1);

  const handleAnchorClick = (e) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }

    if (onClickCallback) onClickCallback();
  };

  const classes = `uppercase inline-block relative text-[13px] leading-[1.46em] font-bold tracking-[1px] overflow-hidden mt-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300 after:ease-linear
          ${
            location.pathname === item.href
              ? "text-primary after:translate-x-0"
              : "text-gray-900 hover:text-primary after:-translate-x-full hover:after:translate-x-0"
          }`;
  return (
    <li>
      {isAnchor ? (
        <a href={item.href} onClick={handleAnchorClick} className={classes}>
          {item.name}
        </a>
      ) : (
        <Link to={item.href} className={classes}>
          {item.name}
        </Link>
      )}
    </li>
  );
};

const Header = () => {
  const { cart } = useCart();
  const itemCount = cart.length;
  const location = useLocation();
  const showBadge = itemCount > 0 && location.pathname !== "/cart";

  const [lastY, setLastY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setShowDropdown(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollingUp = currentY < lastY;

      setAtTop(currentY === 0);
      setShowHeader(currentY === 0 || scrollingUp);

      setLastY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: showHeader ? 0 : "-100%" }}
        transition={{ type: "tween", duration: 0.2 }}
        className={`${
          atTop ? "absolute" : "fixed"
        } top-0 left-0 w-full z-[995] shadow-sm bg-[#f7f7fa]`}
      >
        <div className="container">
          <div className="row relative z-[920]">
            <nav className="flex items-center justify-between h-24">
              <ul className="hidden lg:flex gap-8 px-3 items-center justify-end">
                {navigation.slice(0, 3).map((item, index) => (
                  <RenderLink key={index} item={item} />
                ))}
              </ul>
              <div className="lg:w-4/12 w-full">
                <h1 className="text-center uppercase text-2xl lg:text-[32px] m-auto">
                  Ronald Shelton
                </h1>
              </div>
              <ul className="hidden lg:flex gap-8 px-3 items-center justify-start">
                {navigation.slice(3).map((item, index) => (
                  <RenderLink key={index} item={item} />
                ))}
                <li>
                  <Button href="/" className="text-[13px] py-2.5 px-4">
                    Buy now on Amazon
                  </Button>
                </li>
              </ul>
              <div className="relative z-[1] block lg:hidden">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="relative w-8 h-6 cursor-pointer flex items-center justify-center transition duration-300"
                >
                  {[...Array(3)].map((_, index) => (
                    <span
                      key={index}
                      className={`absolute w-full h-1 bg-black rounded-md transition duration-300 ${
                        showDropdown
                          ? index === 0
                            ? "opacity-0 rotate-[135deg] origin-center"
                            : index === 1
                            ? "rotate-45 origin-center duration-300"
                            : "-rotate-45 origin-center duration-300"
                          : index === 0
                          ? "top-0 duration-[0]!"
                          : index === 1
                          ? "top-1/2 -translate-y-1/2"
                          : "bottom-0"
                      }`}
                    ></span>
                  ))}
                </button>
              </div>
            </nav>
          </div>
          <AnimatePresence initial={false} exitBeforeEnter>
            {showDropdown && (
              <motion.ul
                key="dropdown"
                initial={{ opacity: 0, y: -35 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -35 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-5 justify-start items-center lg:hidden absolute top-full left-0 w-full z-[910] bg-[#f7f7fa] shadow-sm px-10 pt-2 pb-5 transition-none"
              >
                {navigation.map((item, index) => (
                  <RenderLink
                    key={index}
                    item={item}
                    onClickCallback={() => setShowDropdown(false)}
                  />
                ))}
                <div className="pt-4 border-t border-t-gray-200">
                  <Button className="text-xs px-5 py-3">
                    Buy now on Amazon
                  </Button>
                </div>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {showBadge && (
        <Link
          to="/cart"
          className="fixed z-[900] inline-flex items-center justify-center gap-1.5 right-0 top-28 lg:top-1/2 lg:-translate-y-1/2 p-3 lg:p-6 text-primary hover:text-primary-600 text-base lg:text-lg bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)]"
        >
          <HiOutlineShoppingCart className="text-2xl text-gray-800" />
          <span>Cart</span> <span>({itemCount})</span>
        </Link>
      )}
    </>
  );
};

export default Header;
