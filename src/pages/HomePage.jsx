import React from "react";
// import ThreeDScene from "../components/ThreeDScene";
import { Typewriter } from "react-simple-typewriter";

import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer/CountdownTimer";
import Timeline from "../components/TimeLine.jsx/TimeLine";
import EntryDomains from "../components/EntryDomains/EntryDomains";
import WhySAE from "../components/WhySAE/WhySAE";
// import Test from "../components/Test/Test";



const HomePage = () => {
 const navigate = useNavigate();

  return (
    <>
      <div className="w-full overflow-hidden  ">
        <div className="w-full h-screen flex flex-col  lg:flex-row ">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 h-1/2 lg:h-screen  text-white flex flex-col justify-center  items-center p-6">
            <div className="content text-center lg:text-left flex items-center flex-col lg:flex-row">
              <div className="header mb-6">
                <h1 className=" lg:text-5xl font-bold pb-2">Audition</h1>
                <p className="text-lg lg:text-xl mt-2">
                  Society of Automotive Engineers Collegiate Club of NIT
                  Durgapur
                </p>
              </div>
              <p className="text-md lg:text-lg my-3">
                We are Here to{" "}
                <span>
                  "
                  <Typewriter
                    words={["Collaborate", "Innovate", "Learn"]}
                    loop={Infinity}
                    cursor
                    cursorStyle=""
                    typeSpeed={120}
                    deleteSpeed={80}
                    delaySpeed={1000}
                  />
                  "
                </span>
              </p>
              <div
                id="tenth"
                className="reg-buttonBox "
                onClick={() => navigate("/googleAuth")}
              >
                <button className=" homebtn ">
                  <span>R</span>
                  <span>E</span>
                  <span>G</span>
                  <span>I</span>
                  <span>S</span>

                  <span>T</span>
                  <span>e</span>
                  <span>R</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 h-1/2 lg:h-screen align-center flex items-center justify-center">
            {/* <ThreeDScene /> */}
            <img
              className="w-[400px] h-[350px] lg:w-full lg:h-full object-center "
              src="../../Images/pngwing.com (6).png"
              alt=""
            />
          </div>
        </div>

        <div className="w-full h-auto  text-white flex flex-col items-center justify-center">
          <CountdownTimer />
        </div>
        <div className="w-full h-auto  text-white flex flex-col items-center justify-center mb-14">
          <WhySAE/>
        </div>
        <div className="w-full h-auto  text-white flex flex-col items-center justify-center">
          <EntryDomains />
        </div>
        <div>
          <Timeline />
        </div>
        <div>{/* <Test/> */}</div>
      </div>
    </>
  );
};

export default HomePage;