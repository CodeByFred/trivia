import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = "button",
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="text-white bg-blue-700 hover:bg-blue-500 focus:ring-4 rounded-sm px-3 py-1"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
