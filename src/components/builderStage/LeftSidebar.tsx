import React from "react";
import { Link } from "react-router-dom";
import DarkMode from "../../theme/DarkMode";
import { IoLanguage, IoSettings, IoCellular, IoCreate } from "react-icons/io5";
import { PiPencilSimpleLineFill } from "react-icons/pi";

// import DarkModeTheme from "./../theme/DarkModeTheme";

const LeftSidebar: React.FC = () => {
  
  
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
    <div className="w-1/6 sticky flex flex-col dark:bg-primary-6 bg-primary-5 dark:text-primary-4 dark:border-primary-2 border-r-2 border-primary-3">
      <div className="pt-20 flex flex-row gap-2 items-center justify-center">
        <PiPencilSimpleLineFill
          className="dark:text-primary-4 text-primary-1"
          size="25"
        />
        <p className="font-product text-2xl font-semibold">
          <Link to="/">Yeonjii</Link>
        </p>
      </div>
      <div className="pt-20 flex flex-col justify-center items-center">
          <button className="flex flex-row items-center gap-4 mb-10 font-open dark:text-primary-4 text-primary-1" onClick={handleRefresh}>
          <IoCreate
            className="dark:text-primary-4 text-primary-1"
            size="20"
            />
            Generator
          </button>
        <div className=" flex flex-row items-center gap-4 mb-10">
          <IoLanguage
            size="20"
            className="dark:text-purple-400 text-primary-2"
          />
          <p className="font-open dark:text-purple-400 text-primary-2">
            Language
          </p>
        </div>
        <div className=" flex flex-row items-center gap-4 mb-10">
          <IoCellular
            size="20"
            className="dark:text-purple-400 text-primary-2"
          />
          <p className="font-open dark:text-purple-400 text-primary-2">
            Analytics
          </p>
        </div>
        <div className="flex flex-row items-center gap-4 mb-5">
          <IoSettings
            size="20"
            className="dark:text-purple-400 text-primary-2"
          />
          <p className="font-open dark:text-purple-400 text-primary-2">
            Settings
          </p>
        </div>
      </div>
      <div className="flex items-end justify-center mt-auto mb-20">
        <DarkMode />
      </div>
    </div>
    </>
  );
};

export default LeftSidebar;
