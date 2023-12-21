import React, {useState, ReactNode} from 'react'
import {
    IoInformationCircle,
  } from "react-icons/io5";

interface InfoHoverProps {
    children: ReactNode;
}

const InfoHover:React.FC<InfoHoverProps> = ({children}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
    return (
    <div className="relative ">
        <IoInformationCircle   
        size={20}
        className="text-primary-2 hover:text-primary-6 rounded-full cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}/>
      <div
     

      ></div>

      {isHovered && (
        <div className="absolute top-[-30px] left-7 p-4 w-[28rem] h-20 bg-primary-2 text-primary-5 rounded shadow">
            <div className="absolute top-[30px] left-[-5px] w-4 h-4 rotate-45 bg-primary-2"></div>
          {children}
        </div>
      )}
    </div>
  );
};

export default InfoHover