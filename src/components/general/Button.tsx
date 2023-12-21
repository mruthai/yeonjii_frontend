import React from "react";

interface ButtonProps {
    buttonCss: string;
    onClick: () => void;
    buttonText: string;

}

const Button: React.FC<ButtonProps> = ({buttonCss, onClick, buttonText}) => {
  return (
    <button
      className={buttonCss}
      onClick={onClick}>
     
      {buttonText}
    </button>
  );
};

export default Button;
