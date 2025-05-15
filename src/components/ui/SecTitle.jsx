const SecTitle = ({
  fontsize = "52px",
  title,
  tagline,
  className = "mb-[60px]",
}) => {
  return (
    <div className={`relative ${className}`}>
      <h2
        className={`sptitle relative font-semibold mb-2.5 tracking-[2px] uppercase z-[1]`}
        style={{ fontSize: fontsize }}
      >
        {title}
      </h2>
      <div
        className="mb-5 border-b-[3px] border-dotted border-primary relative inline-block text-xs font-bold uppercase tracking-[4px]"
        dangerouslySetInnerHTML={{ __html: tagline }}
      />
    </div>
  );
};

export default SecTitle;
