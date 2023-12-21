import React, { useContext, useState, useEffect } from "react";
import {
  IoArrowBackOutline,
  IoSparklesSharp,
  IoWarningOutline
} from "react-icons/io5";
import { DataContext } from "../../context/DataProvider";
import Loading from "../general/Loading";
import TipsPopUp from "../general/TipsPopUp";
import InfoHover from "../general/InfoHover";

interface UserProviderProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSave: () => void;
  moveBack: () => Promise<void>;
  maxLengthUserTextArea: number;
}

// Function to use to send user data to redis

const Story: React.FC<UserProviderProps> = ({
  value,
  onChange,
  onSave,
  moveBack,
  maxLengthUserTextArea,
}) => {
  const { errorMessage } = useContext(DataContext);
  const contextValue = useContext(DataContext);
  console.log(contextValue);
  const [characterCount, setCharacterCount] = useState<number>(value.length);
  const [isTipsOpen, setIsTipsOpen] = useState<boolean>(false);

  useEffect(() => {
    setCharacterCount(value.length);
  }, [value]);

  const openTips = () => {
    setIsTipsOpen(true);
  };
  const closeTips = () => {
    setIsTipsOpen(false);
  };

  // Interface below is used to show every textarea for the

  return (
    <div className="dark:bg-primary-6 p-2 rounded-xl bg-primary-5 mx-auto md:w-[600px] w-[500px]  h-6/12 shadow-xl ">
      <div className="relative">
        <div className="absolute lg:bottom-[-420px] md:bottom-[-520px] lg:right-[-225px] md:right-[-145px] ">
          <TipsPopUp
            tipsOpen={isTipsOpen}
            tipsClose={closeTips}>
            <div className="flex flex-row gap-2 mt-2">
              <IoSparklesSharp
                size={20}
                className="text-yellow-400"
              />
              <p className="text-primary-5 font-open text-base">Expert Tip</p>
            </div>
            <p className="pl-2 mt-2 text-primary-5 font-open text-xs">
              Here are some questions to think about to help you get started!
              <br />
            </p>
              <p className="pl-2 mt-2 text-primary-5 text-[11px] font-open">(BONUS: Make your stories relevant to the company's values,
              mission, and/or skills for the role)</p>
            <ul className="text-primary-5 text-xs space-y-2 mt-2 pl-2 list-disc list-inside">
              <li className="flex items start">•<span className="mr-2"> Write about a time when you took on a challenging project</span> </li>
              <li className="flex items start">•<span className="mr-2"> Your greatest achievement story</span> </li>
              <li className="flex items start">•<span className="mr-2"> Any personal adversity that you overcame</span></li>
            </ul>
          </TipsPopUp>
        </div>
      </div>
      <div className="flex flex-col justify-start px-8 pt-5 ">
        <div className="flex flex-row items-center space-x-2">
          <h2 className="dark:text-primary-4 font-headers text-xl font-semibold">
            Please provide a short story
          </h2>
        <InfoHover>
        <p className="font-open text-sm">Your story is what makes your cover letter unique.</p>
        <p className="font-open text-sm">Click in the text area below to see expert tips</p>
        
        </InfoHover>   
        </div>
        <p className="dark:text-primary-4 text-primary-6 py-6">
        Tells us a personal story to highlight your experiences and skills!
        </p>
      </div>
      <div className="flex justify-center items-center">
        <textarea
          className="w-11/12 h-52 px-3 py-2 bg-primary-4 border rounded-xl text-primary-6 dark:text-primary-5 dark:bg-primary-6 placeholder:gray-500 focus:outline-none resize-none"
          value={value}
          placeholder='Example: 
          "In a previous sales position, I successfully led the transition to a new CRM system while balancing my sales duties. I strategically allocated daily time slots for the CRM project, ensuring a seamless transition two weeks ahead of schedule and surpassing my sales targets by 10%."'
          onChange={onChange}
          onFocus={openTips}
          onBlur={closeTips}
          maxLength={maxLengthUserTextArea}
        />
      </div>
      <div className="flex justify-end pr-7">
        <p className="text-primary-3 text-sm">
          {characterCount}/{maxLengthUserTextArea}
        </p>
      </div>
        {errorMessage && (
        <div className="flex flex-row justify-center items-center gap-1">
        <IoWarningOutline
        size={20} 
        className="text-red-500"/>
        <p className=" dark:text-red-200 text-red-500 font-open text-sm font-semibold">
        {errorMessage}
          </p>
      </div>
        )}
      <div className="flex px-6 flex-row justify-between">
        <button
          className="flex flex-row items-center gap-3 text-primary-2 dark:text-primary-4 font-open font-thin my-10 py-2 px-8 rounded-lg"
          onClick={async () => {
            await moveBack();
          }}>
          <IoArrowBackOutline />
          Back
        </button>
        <button
          className="dark:border-primary-3 dark:border bg-primary-1 flex flex-row items-center gap-2  text-primary-4 font-open font-thin my-10 py-2 px-8 rounded-lg"
          onClick={onSave}>
          <Loading />
          Continue
        </button>
      </div>
    </div>
  );
};

export default Story;
