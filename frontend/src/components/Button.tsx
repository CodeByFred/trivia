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
    <button
      type={type}
      onClick={onClick}
      className={"btn btn-lg  btn-wide rounded-2xl m-2 " + className}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
