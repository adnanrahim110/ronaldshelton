// src/components/ui/ScrollBar.jsx
import React, { useEffect, useRef, useState } from "react";

const ScrollBar = ({ containerRef }) => {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const [trackHeight, setTrackHeight] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startTop = useRef(0);

  const calculate = () => {
    const container = containerRef.current;
    if (!container) return;
    const { clientHeight, scrollHeight, scrollTop } = container;
    setTrackHeight(clientHeight);

    const ratio = clientHeight / scrollHeight;
    const h = Math.max(clientHeight * ratio, 20);
    setThumbHeight(h);

    const maxScroll = scrollHeight - clientHeight;
    const maxThumb = clientHeight - h;
    setThumbTop(maxScroll > 0 ? (scrollTop / maxScroll) * maxThumb : 0);
  };

  useEffect(() => {
    calculate();
    const onResize = () => calculate();
    window.addEventListener("resize", onResize);
    const c = containerRef.current;
    c?.addEventListener("scroll", calculate);
    return () => {
      window.removeEventListener("resize", onResize);
      c?.removeEventListener("scroll", calculate);
    };
  }, []);

  const onTrackClick = (e) => {
    e.stopPropagation();
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const { top } = track.getBoundingClientRect();
    const clickY = e.clientY - top;
    const half = thumbHeight / 2;
    const newTop = Math.min(
      Math.max(clickY - half, 0),
      trackHeight - thumbHeight
    );
    const maxScroll = container.scrollHeight - container.clientHeight;
    container.scrollTop = (newTop / (trackHeight - thumbHeight)) * maxScroll;
  };

  const startDrag = (e) => {
    e.preventDefault();
    isDragging.current = true;
    startY.current = e.clientY;
    startTop.current = thumbTop;
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  };
  const onDrag = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const delta = e.clientY - startY.current;
    const newTop = Math.min(
      Math.max(startTop.current + delta, 0),
      trackHeight - thumbHeight
    );
    const container = containerRef.current;
    const maxScroll = container.scrollHeight - container.clientHeight;
    container.scrollTop = (newTop / (trackHeight - thumbHeight)) * maxScroll;
    setThumbTop(newTop);
  };
  const stopDrag = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
  };

  return (
    <div
      ref={trackRef}
      onClick={onTrackClick}
      className="absolute border-l-[3px] border-black bg-transparent max-h-[calc(100vh_-_200px)]!"
      style={{
        top: "100px",
        right: "22%",
        width: "0.875rem",
        height: `${trackHeight}px`,
      }}
    >
      <div
        ref={thumbRef}
        onMouseDown={startDrag}
        className="absolute right-0 w-[25px] min-h-[25px]! border-[3px] border-black rounded-full bg-white cursor-pointer"
        style={{ height: `${thumbHeight}px`, top: `${thumbTop}px` }}
      />
    </div>
  );
};

export default ScrollBar;
