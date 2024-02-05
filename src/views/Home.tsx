import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import images from "../constants/images";
import {
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoFacebook,
  IoMailSharp,
  IoSparklesSharp,
  IoDocumentText,
  IoPersonCircleSharp,
  IoHappySharp,
} from "react-icons/io5";
import { DataContext } from "./../context/DataProvider";

const Home: React.FC = () => {
  const { wakeUpBackend } = useContext(DataContext);

  return (
    <div className="h-screen">
      <div className="flex flex-row items-center justify-between p-10 ">
        <div className="bg-white pl-36 flex flex-row gap-1 items-center">
          <PiPencilSimpleLineFill
            size="30"
            className="text-primary-1"
          />
          <p className="text-3xl font-semibold font-product">Yeonjii</p>
        </div>
        {/* <div className="space-x-4 pr-36">
          <button className="font-open  text-primary-6 px-8 py-3">Login</button>
          <button className="font-open text-primary-6 border border-purple-400 rounded-3xl px-7 py-3">
            Sign up
          </button>
        </div> */}
      </div>
      <div className="flex flex-row justify-center items-center w-full max-w-screen-2xl mx-auto p-20 bg-gradient-to-tr from-purple-200 via-white to-purple-200 rounded-2xl">
        <div className="relative flex flex-col flex-grow m-10">
          <h3 className="text-2xl font-headers">Make an impression with</h3>
          <IoSparklesSharp
            size={20}
            className="text-primary-1 absolute top-8 animate-pulse"
          />
          <h1 className="mt-2 text-5xl font-headers font-semibold">
            AI-Personalized
            <br />
            Cover Letters
          </h1>
          <p className="font-open my-8 max-w-xs md:max-w-md lg:max-w-lg">
            Start your career with impact. Our AI, refined by tech experts,
            creates cover letters that showcase your skills and drive.
          </p>
          <Link to="/builder">
            <button
              onClick={async () => {
                wakeUpBackend();
              }}
              className="font-open border-2 text-primary-4 font-semibold rounded-full w-[200px] px-3 py-4 bg-primary-1 hover:bg-primary-6 hover:text-primary-5">
              Try Yeonjii{" "}
              <span className="font-open font-thin hover:text-primary-5">
                for Free
              </span>
            </button>
          </Link>
        </div>
        <div className="flex-shrink-0">
          <img
            className="w-full max-w-md md:max-w-lg lg:max-w-xl"
            src={images.hero}
            alt="Hero Image"
          />
        </div>
      </div>

      <div className="flex flex-col items-center my-20 border-primary-1 border max-w-screen-2xl mx-auto p-20 rounded-2xl">
        <h2 className="font-headers text-5xl">Why Yeonjii?</h2>
        <div className="flex mt-5 py-5">
          <div className="flex-1 bg-purple-100 space-y-3 rounded-lg p-10 m-10">
            <div className="bg-primary-1 rounded-full h-12 w-12 flex items-center justify-center">
              <IoDocumentText
                size={32}
                className="text-primary-5"
              />
            </div>
            <h4 className="font-headers font-semibold">Industry expertise</h4>
            <p className="pr-10 font-open">
              Stand out with our expert-created cover letters, tailored for
              impact with industry insights and professional guidance. Elevate
              your job application instantly!
            </p>
          </div>
          <div className="flex-1 bg-purple-100 space-y-3 rounded-lg p-10 m-10">
            <div className="bg-primary-1 rounded-full h-12 w-12 flex items-center justify-center">
              <IoPersonCircleSharp
                size={32}
                className="text-primary-5"
              />
            </div>
            <h4 className="font-headers font-semibold">
              Personalized to make it unique to you
            </h4>
            <p className="font-open">
              Stripped of fluff, our AI focuses on creating content unique to
              your personal story. Make your cover letter shine. Get straight to
              what matters!
            </p>
          </div>
          <div className="flex-1 bg-purple-100 space-y-3 rounded-lg p-10 m-10">
            <div className="bg-primary-1 rounded-full h-12 w-12 flex items-center justify-center">
              <IoHappySharp
                size={32}
                className="text-primary-5"
              />
            </div>
            <h4 className="font-headers font-semibold">Easy to use</h4>
            <p className="font-open">
              Experience simplicity with our AI-powered cover letter generator.
              Advanced yet user-friendly.
            </p>
          </div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col justify-between items-center max-w-screen-2xl mx-auto rounded-2xl px-24 gap-32  bg-gradient-to-r from-purple-100 via-white to-purple-200">
        <div className="flex-shrink-0">
          <img src={images.start}
          alt='call to action'
          />
        </div>
        <div className="flex flex-col space-y-5 ">
          <h3 className="font-headers text-5xl">
            Start creating your perfect cover letter today!
          </h3>
          <Link to="/builder">
            <button
              onClick={async () => {
                wakeUpBackend();
              }}
              className="font-open text-primary-1 border border-primary-1 py-3 px-7 hover:bg-primary-1 hover:text-primary-5 hover:shadow-lg rounded-3xl bg-primary-5">
              Start Generating
            </button>
          </Link>
        </div>
      </div>
      <div className="h-96 bg-primary-5 flex flex-row justify-around">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row space-x-1 items-center">
            <PiPencilSimpleLineFill
              size="25"
              className="text-primary-1"
            />
            <h2 className="font-product text-primary-6 text-3xl ">Yeonjii</h2>
          </div>
          <div className="flex flex-row space-x-6 mt-20">
            <p className="font-open text-primary-6">
              All Rights Reserved Yeonjii 2023
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-10">
          <div className="flex flex-row space-x-6">
            <p className="font-open text-primary-6">Terms</p>
            <p className="font-open text-primary-6">Privacy</p>
            <p className="font-open text-primary-6">Cookies</p>
          </div>
          <div className="flex flex-row items-center space-x-4">
          <div className="border rounded-full h-12 w-12 flex items-center justify-center shadow">
              <IoLogoLinkedin
                size={20}
                className="text-primary-6"
              />
            </div>
          <div className="border rounded-full h-12 w-12 flex items-center justify-center shadow">
              <IoLogoTwitter
                size={20}
                className="text-primary-6"
              />
            </div>
          <div className="border rounded-full h-12 w-12 flex items-center justify-center shadow">
              <IoLogoFacebook
                size={20}
                className="text-primary-6"
              />
            </div>
          <div className="border rounded-full h-12 w-12 flex items-center justify-center shadow">
              <IoMailSharp
                size={20}
                className="text-primary-6"
              />
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
