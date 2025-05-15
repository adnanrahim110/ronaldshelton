import { Link } from "react-router-dom";

const Button = ({
  className,
  href,
  onClick,
  children,
  type,
  icon,
  btn2,
  iconClass,
  disabled,
  ...props
}) => {
  let activeClass = "btn-main";
  if (btn2) {
    activeClass = "btn-2";
  }
  const combinedClassName = className
    ? `btn ${className} ${activeClass}`
    : `btn ${activeClass}`;
  const BtnIcon = icon;
  const renderButton = () => (
    <button
      onClick={onClick}
      type={type}
      {...props}
      disabled={disabled}
      className={combinedClassName}
    >
      {icon && <BtnIcon className={iconClass} />}
      {children}
    </button>
  );

  const renderLink = () => (
    <Link to={href} {...props} className={combinedClassName}>
      {icon && <BtnIcon className={iconClass} />}
      {children}
    </Link>
  );

  return href ? renderLink() : renderButton();
};

export default Button;
