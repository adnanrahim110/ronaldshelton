import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { bookChapters } from "../../constant";
import { ReadBookContext } from "../../context/ReadBookContext";
import ScrollBar from "../ui/ScrollBar";

const ReadBook = () => {
  const { isOpen, closePanel } = useContext(ReadBookContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const contentRef = useRef(null);
  const total = bookChapters.length;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const goToChapter = (index) => {
    if (index < 0 || index >= total || index === currentChapter) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentChapter(index);
      setIsFlipping(false);
    }, 500);
  };
  const MenuIcon = isMenuOpen ? IoCloseSharp : AiOutlineFileSearch;

  return (
    <div
      className={`[transition:0.7s_transform_ease-linear,0.3s_left_ease-linear] fixed top-0 ${
        isMenuOpen ? "left-[260px]" : "left-0"
      } ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-[2000] bg-white w-dvw overflow-visible min-h-[-webkit-fill-available]`}
    >
      <div className="absolute -left-[260px] text-[22px] font-light leading-[37px] bg-gray-50 w-[260px] h-full z-[1000] top-0 py-[50px] px-5">
        <h3 className="text-[19px] mb-2.5 uppercase text-center tracking-wide">
          table of contents
        </h3>
        <ul className="relative py-[30px] h-[90%] touch-auto overflow-hidden">
          {bookChapters.map((chapter, idx) => (
            <li key={idx}>
              <button
                onClick={() => {
                  goToChapter(idx);
                  setIsMenuOpen(!isMenuOpen);
                }}
                className={`${
                  idx === currentChapter
                    ? "border-l-[10px] text-primary-600 font-medium"
                    : "border-l-2 hover:border-l-[10px] text-primary hover:text-primary-600"
                } cursor-pointer border-l-primary transition-all duration-300 block py-2.5 px-5`}
              >
                {chapter.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative w-dvw h-dvh">
        <div className="relative w-dvw h-dvh min-h-[-webkit-fill-available] bg-white z-[100] perspective-[2000px]">
          {bookChapters.map((chapter, idx) => {
            if (idx !== currentChapter) return null;
            return (
              <div
                key={idx}
                className={`
                  w-full h-dvh absolute top-0 left-0 bg-white pb-[70px] transition-all duration-500 ${
                    isFlipping
                      ? "opacity-0 -translate-y-5"
                      : "opacity-100 translate-y-0"
                  }
                `}
              >
                <div className="absolute left-0 w-full h-dvh p-[100px_22%] overflow-hidden [-webkit-font-smoothing:subpixel-antialiased] text-[22px] font-light leading-[37px]">
                  <div
                    className="relative h-full pr-[70px] touch-auto overflow-y-auto chptr_scroll"
                    ref={contentRef}
                  >
                    <h1 className="text-center mb-[90px]">{chapter.name}</h1>
                    {chapter.content.map((content, index) => {
                      if (content.text) {
                        return (
                          <p
                            key={index}
                            className={`text-justify mb-5 ${
                              index === 0
                                ? "inline-block w-full first-letter:font-cinzel first-letter:float-left first-letter:text-[78px] first-letter:font-bold first-letter:leading-14 first-letter:p-[10px_10px_2px] first-letter:text-primary"
                                : ""
                            }`}
                          >
                            {content.text}
                          </p>
                        );
                      }
                      if (content.img) {
                        return (
                          <p key={index} className="not-last-of-type:mb-5">
                            <img
                              src={content.img}
                              className="mb-4 mx-auto block clear-both"
                              alt=""
                            />
                          </p>
                        );
                      }
                    })}
                  </div>
                  {idx === currentChapter && (
                    <ScrollBar containerRef={contentRef} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <nav className="block">
          {currentChapter > 0 && (
            <button
              onClick={() => goToChapter(currentChapter - 1)}
              className="right-auto left-[7%] text-primary absolute top-[50%] [speak:none] text-[77px] text-center font-bold cursor-pointer z-[1000]"
            >
              ←
            </button>
          )}
          {currentChapter < total - 1 && (
            <button
              onClick={() => goToChapter(currentChapter + 1)}
              className="left-auto right-[7%] text-primary absolute top-[50%] [speak:none] text-[77px] text-center font-bold cursor-pointer z-[1000]"
            >
              →
            </button>
          )}
        </nav>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute left-[60px] top-[50px] text-sm uppercase tracking-[2px] pl-10 text-center font-bold cursor-pointer z-[1000] text-primary group"
        >
          <MenuIcon className="absolute text-3xl -top-1 left-2 z-[1] transition-all duration-200 group-hover:scale-125" />
          <span className="inline-block text-center invisible opacity-0 align-baseline mt-0.5 -translate-x-[60px] scale-[0.6] group-hover:translate-x-0 group-hover:opacity-100 group-hover:scale-100 group-hover:visible transition-all duration-200 ease-in-out">
            {isMenuOpen ? "hide chapters" : "show chapters"}
          </span>
        </button>
        <button
          onClick={closePanel}
          className="absolute text-primary right-[66px] top-10 left-auto text-[40px] hover:scale-125 hover:text-primary-700 text-center cursor-pointer z-[1000]"
        >
          <IoCloseSharp />
        </button>
      </div>
    </div>
  );
};

export default ReadBook;
