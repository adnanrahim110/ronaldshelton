import React from "react";

const ElmTitle = ({
  title,
  className = "mb-10",
  fontsize = "text-4xl",
  rounded,
}) => {
  return (
    <div className={`relative ${className}`}>
      <span
        className={`absolute bottom-1/5 left-0 right-0 opacity-60 h-[30%] bg-[#ddd] z-0 ${rounded}`}
        style={{
          backgroundImage:
            "radial-gradient(circle at 100% 150%, #ddd 24%, white 25%, white 28%, #ddd 29%, #ddd 36%, white 36%, white 40%, transparent 40%, transparent), radial-gradient(circle at 0 150%, #ddd 24%, white 25%, white 28%, #ddd 29%, #ddd 36%, white 36%, white 40%, transparent 40%, transparent), radial-gradient(circle at 50% 100%, white 10%, #ddd 11%, #ddd 23%, white 24%, white 30%, #ddd 31%, #ddd 43%, white 44%, white 50%, #ddd 51%, #ddd 63%, white 64%, white 71%, transparent 71%, transparent), radial-gradient(circle at 100% 50%, white 5%, #ddd 6%, #ddd 15%, white 16%, white 20%, #ddd 21%, #ddd 30%, white 31%, white 35%, #ddd 36%, #ddd 45%, white 46%, white 49%, transparent 50%, transparent), radial-gradient(circle at 0 50%, white 5%, #ddd 6%, #ddd 15%, white 16%, white 20%, #ddd 21%, #ddd 30%, white 31%, white 35%, #ddd 36%, #ddd 45%, white 46%, white 49%, transparent 50%, transparent)",
          backgroundSize: "50px 25px",
        }}
      />
      <h2 className={`${fontsize} px-10 inline-block mb-0 relative z-[1]`}>
        {title}
      </h2>
    </div>
  );
};

export default ElmTitle;
