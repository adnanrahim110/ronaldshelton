import { useLayoutEffect, useRef } from "react";
import { bookChapters } from "../../constant";

const ReadBook = () => {
  const scrollRef = useRef(null);
  const thumbRef = useRef(null);

  // on mount & on scroll, recalc thumb size/position
  useLayoutEffect(() => {
    const scroller = scrollRef.current;
    const thumb = thumbRef.current;
    if (!scroller || !thumb) return;

    const updateThumb = () => {
      const { scrollTop, scrollHeight, clientHeight } = scroller;
      // thumb height proportional to visible area
      const thumbHeight = (clientHeight / scrollHeight) * clientHeight;
      // thumb offset proportional to scroll position
      const thumbTop = (scrollTop / scrollHeight) * clientHeight;
      thumb.style.height = `${thumbHeight}px`;
      thumb.style.transform = `translateY(${thumbTop}px)`;
    };

    scroller.addEventListener("scroll", updateThumb);
    updateThumb();
    return () => scroller.removeEventListener("scroll", updateThumb);
  }, []);

  return (
    <div
      className={`[transition:0.5s_transform,0.3s_left] fixed top-0 left-0 z-[2000] bg-white w-dvw overflow-visible min-h-[-webkit-fill-available]`}
    >
      <div className="relative w-dvw h-[calc(9.65px_*_100)]">
        <div className="relative w-dvw h-dvh min-h-[-webkit-fill-available] bg-white z-[100] perspective-[2000px]">
          {bookChapters.map((chapter, idx) => {
            return (
              <div
                key={idx}
                className="w-full h-dvh absolute top-0 left-0 bg-white pb-[70px]"
              >
                <div className="absolute left-0 w-full h-dvh p-[100px_22%] overflow-hidden [-webkit-font-smoothing:subpixel-antialiased] text-[22px] font-light leading-[37px]">
                  <div
                    ref={scrollRef}
                    className="relative h-full pr-[70px] touch-auto overflow-y-auto chptr_scroll"
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
                    <div className="absolute top-0 right-2 h-full w-1 bg-gray-200 rounded">
                      <div
                        ref={thumbRef}
                        className="w-full bg-primary rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReadBook;
