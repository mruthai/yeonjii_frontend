import React, { ReactNode } from "react";
// import { IoCloseOutline } from "react-icons/io5";

interface TipsPopUpProps {
  tipsOpen: boolean;
  tipsClose: () => void;
  children: ReactNode;
}

const TipsPopUp: React.FC<TipsPopUpProps> = ({
  tipsOpen,
  children,
}) => {
  if (!tipsOpen) return null;

  return (
    
      <div className="relative lg:w-[15rem] md:w-[10rem] lg:h-72 md:h-96  bg-primary-1 p-4 rounded-lg shadow-md">
    <div className="w-4 h-4 absolute top-[135px] left-[-5px] rotate-45 bg-primary-1"></div>
        {children}
      </div>
  
  );
};

export default TipsPopUp;
