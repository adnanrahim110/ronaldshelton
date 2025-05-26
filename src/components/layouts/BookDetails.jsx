import { useContext, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { FiMinus, FiPlus } from "react-icons/fi";
import { LuBookOpenText } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import { ReadBookContext } from "../../context/ReadBookContext";
import BookHover from "../ui/BookHover";
import Button from "../ui/Button";
import SecTitle from "../ui/SecTitle";

const BookDetails = ({ book }) => {
  const { openPanel, isLoading } = useContext(ReadBookContext);
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const { cart, addItem } = useCart();

  const inCart = cart.some((item) => item.id === book.id);
  const navigate = useNavigate();

  const onAddToCart = () => {
    addItem(book, quantity);
    toast.success(
      <div className="flex flex-col toastAddCrt">
        <span>📚 Book added to cart</span>
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => {
              navigate("/cart");
              toast.dismiss();
            }}
            className="px-3 py-2 bg-transparent border text-xs uppercase border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in-out"
          >
            View Cart
          </button>
          <button
            onClick={() => {
              navigate("/checkout");
              toast.dismiss();
            }}
            className="px-3 py-2 bg-primary border text-xs uppercase border-primary text-white hover:bg-transparent hover:text-primary transition-all duration-300 ease-in-out"
          >
            Checkout
          </button>
        </div>
      </div>,
      {
        autoClose: 1500,
        closeOnClick: false,
      }
    );
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="relative lg:float-left lg:w-[35%] mb-[2em]">
          <BookHover
            price={book.price}
            discountedPrice={book.discountedPrice}
            img={book.img}
          />
        </div>
        <div className="lg:float-right lg:w-[65%] lg:pl-[210px] pl-0 2xl:pl-[140px] max-lg:text-center">
          <SecTitle title={book.title} className="lg:mb-[60px]" />
          <div className="relative mb-[60px]">
            {book.text.map((t, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: t }} />
            ))}
          </div>
          <form className="mb-5">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 h-[50px]">
                <div className="flex justify-center border border-neutral-400 has-disabled:cursor-not-allowed has-disabled:border-gray-200 has-disabled:text-gray-400 gap-2 h-full">
                  <button
                    type="button"
                    disabled={inCart}
                    className="px-3.5 hover:bg-primary-100 disabled:bg-transparent disabled:cursor-not-allowed"
                    onClick={handleDecrease}
                  >
                    <FiMinus />
                  </button>
                  <input
                    type="number"
                    min={1}
                    name="quantity"
                    readOnly={inCart}
                    inputMode="numeric"
                    value={quantity}
                    onChange={handleChange}
                    className="outline-none max-w-10 py-3.5 font-medium text-center read-only:cursor-not-allowed read-only:select-none"
                  />
                  <button
                    type="button"
                    disabled={inCart}
                    className="px-3.5 hover:bg-primary-100 disabled:bg-transparent disabled:cursor-not-allowed"
                    onClick={handleIncrease}
                  >
                    <FiPlus />
                  </button>
                </div>
                <Button
                  onClick={onAddToCart}
                  disabled={inCart}
                  className="py-3.5 px-4 text-sm grow h-full"
                  btn2
                >
                  {inCart ? "Already in cart" : "Add to cart"}
                </Button>
                <Button
                  btn2
                  icon={isLoading ? FaSpinner : LuBookOpenText}
                  iconClass={
                    isLoading ? "animate-spin [animation-duration:2.2s]" : ""
                  }
                  onClick={openPanel}
                  disabled={isLoading}
                  className="p-3.py-3.5 px-4 text-sm grow mt-0"
                >
                  {isLoading ? "Loading..." : "Read a Chapter"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
