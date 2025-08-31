import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  children,
  type = "button",
  ...rest
}) => {
  return (
    <button type={type} onClick={onClick} className={className} {...rest}>
      {children}
    </button>
  );
};

export default Button;
