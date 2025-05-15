import { Link, useLocation } from "react-router-dom";
import { navigation } from "../../constant";
import Button from "../ui/Button";

const RenderLink = ({ item }) => {
  const location = useLocation();
  return (
    <li>
      <Link
        to={item.href}
        className={`uppercase inline-block relative text-[13px] leading-[1.46em] font-bold tracking-[1px] overflow-hidden mt-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300 after:ease-linear
          ${
            location.pathname === item.href
              ? "text-primary after:translate-x-0"
              : "text-gray-900 hover:text-primary after:-translate-x-full hover:after:translate-x-0"
          }`}
      >
        {item.name}
      </Link>
    </li>
  );
};

const Header = () => {
  return (
    <header className={`absolute top-0 left-0 w-full z-40 shadow-sm`}>
      <div className="container">
        <div className="row">
          <nav className="flex items-center justify-between h-24">
            <ul className="flex gap-8 px-3 items-center justify-end">
              {navigation.slice(0, 3).map((item, index) => (
                <RenderLink key={index} item={item} />
              ))}
            </ul>
            <div className="lg:w-4/12 w-full">
              <h1 className="text-center uppercase text-[32px] m-auto">
                Ronald Shelton
              </h1>
            </div>
            <ul className="flex gap-8 px-3 items-center justify-start">
              {navigation.slice(3).map((item, index) => (
                <RenderLink key={index} item={item} />
              ))}
              <li>
                <Button href="/" className="text-[13px] py-2.5 px-4">
                  Buy now on Amazon
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
