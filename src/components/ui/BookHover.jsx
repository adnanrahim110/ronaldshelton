import { useContext } from "react";
import { FaSpinner } from "react-icons/fa6";
import { ReadBookContext } from "../../context/ReadBookContext";

const BookHover = ({ price, img }) => {
  const { openPanel, isLoading } = useContext(ReadBookContext);
  return (
    <div className="inline-block relative after:table after:clear-both">
      <div className="perspective-distant group">
        <button
          type="button"
          onClick={openPanel}
          disabled={isLoading}
          className="relative inline-block transition-all cursor-pointer duration-200 origin-[35%_50%] transform-3d after:w-[66px] after:z-[0] after:absolute after:-top-0.5 after:left-[98.5%] after:-bottom-0.5 after:bg-[repeating-linear-gradient(to_right,_#f5f5f5,_#f5f5f5_5px,_#aaa_5px,_#aaa_6px)] after:origin-[0%_50%] transform after:rotate-y-90 group-hover:-rotate-y-[35deg]"
        >
          <div
            className={`bg-primary lg:w-[65%] absolute top-[50%] -right-[15px] uppercase py-2.5 px-5 text-white text-[13px] w-1/2 text-left tracking-[1px] group-hover:rotate-y-[35deg] group-hover:translate-3d transition-all duration-200 z-[2] origin-[100%_0] after:absolute after:top-full after:right-0 after:border-t-[15px] after:border-r-[15px] after:border-transparent after:border-t-primary-600`}
          >
            {isLoading && (
              <FaSpinner className="inline-block text-2xl animate-spin [animation-duration:2.2s]" />
            )}
            <span className="ml-2.5">
              {isLoading ? "loading" : "read the book"}
            </span>
          </div>
          <img
            src={img}
            alt=""
            className="group-hover:rounded-r-md relative z-[1]"
          />
          <div className="absolute z-[1] bg-white right-0 bottom-[30%] transform p-[35px] lg:p-[25px]">
            <div className="uppercase text-gray-950 text-[40px] font-cinzel max-2xl:text-3xl lg:text-3xl">
              <span>
                <span className="text-primary text-[32px] leading-5 px-[5px]">
                  $
                </span>
                {price}
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BookHover;
