import React, {useEffect, useState} from 'react'
import { IoSunnyOutline, IoMoon } from 'react-icons/io5'



const DarkMode:React.FC = () => {
    const [darkMode, setDarkMode] = useState<Boolean>(false);

    useEffect(() => {
        if(darkMode){
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    },[darkMode]);

    const switchTheme = () => {
        setDarkMode(!darkMode);
    };

  return (
    <>
        <div className="relative p-2 h-7 w-10 border-2 dark:border-primary-5 bg-primary-3 border-primary-1 rounded-2xl inline-flex items-center cursor-pointer">
        {darkMode ? (
            <IoMoon
            className="absolute  text-gray-500 text-lg right-1 rounded-full"
            onClick={switchTheme}
            />
        ) : (
            <IoSunnyOutline 
            className="absolute text-white text-lg left-1 rounded-full bg-purple-700"
            onClick={switchTheme}
            />
        )}
        </div>
    </>
  )
}

export default DarkMode