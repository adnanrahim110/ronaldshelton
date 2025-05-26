const SecTitle = ({
  fontsize = "lg:text-[52px]",
  title,
  tagline,
  className = "mb-10 lg:mb-[60px]",
}) => {
  return (
    <div className={`relative ${className}`}>
      <h2
        className={`sptitle relative font-semibold mb-2.5 tracking-[2px] uppercase z-[1] max-xs:text-[26px] max-md:text-4xl max-[1199]:text-[42px] ${fontsize}`}
      >
        {title}
      </h2>
      <div
        className="mb-5 border-b-[3px] border-dotted border-primary relative inline-block text-xs font-bold uppercase tracking-widest lg:tracking-[4px]"
        dangerouslySetInnerHTML={{ __html: tagline }}
      />
    </div>
  );
};

export default SecTitle;
