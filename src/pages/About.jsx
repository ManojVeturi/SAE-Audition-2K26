import React, { useEffect } from 'react'
import Carousal from '../components/Carousal/Carousal'
import AOS from "aos";
import "aos/dist/aos.css";
import KnowMoreAbtSae from '../components/KnowMoreAbtSae/KnowMoreAbtSae';

function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 200,
    });
  }, []);
  return (
    <>
      <div className="w-full overflow-hidden ">
        <div className="overflow-hidden w-full">
          <Carousal />
        </div>

        <div className="w-full  lg:mt-0 overflow-hidden">
          <div className="  flex max-w-full flex-col  rounded-md  lg:flex-row-reverse mx-10 my-28 lg:mx-36 lg:my-28 lg:justify-between">
            <div className="h-full w-full lg:h-[400px] lg:w-[590px] ">
              <img
                src="/Images/AarohanforAudition.jpg" //
                alt="Image"
                className="h-full w-full lg:h-[400px] lg:w-[590px] rounded-md object-center"
                data-aos="fade-left"
              />
            </div>

            <div className="lg:w-[600px]  mt-10 lg:mt-0 ">
              <h1
                className="flex items-center text-4xl text-[#ff0000] font-extrabold"
                data-aos="fade-left"
              >
                SAE IN AAROHAN
              </h1>
              <p
                className="mt-5 text-base md:text-lg md:mr-10 text-white "
                data-aos="fade-up-right"
              >
                The SAE India Collegiate Club of NIT Durgapur was a driving
                force behind the success of Aarohan. Their efforts were crucial
                in securing essential sponsorships, organizing stage and
                bringing in speakers for event. SAE organized a wide array of
                events, from technical challenges to engaging workshops,
                ensuring a well-rounded and dynamic experience for all
                participants. Each SAE event, from Flying UAV to Roboliga, Car
                Auction, and Workshop, is designed to captivate and challenge
                participants.. These events works by seamlessly managing
                these diverse responsibilities, SAE significantly amplified the
                impact and success of Aarohan.
              </p>
            </div>
          </div>
          <div className="  flex max-w-full flex-col  rounded-md  lg:flex-row mx-10 my-10 lg:mx-36 lg:my-28 lg:justify-between">
            <div className="h-full w-full lg:h-[400px] lg:w-[590px] ">
              {/* <img
                src="../../../Images/fullvehicle.72e6f860c848885980de.png"
               
                alt="Aarohan"
                className="h-full w-full lg:h-[400px] lg:w-[590px] rounded-md object-center"
                data-aos="fade-right"
              /> */}

              <video
                className="h-full w-full lg:h-[400px] lg:w-[590px] rounded-md object-center"
                data-aos="fade-left"
                loop
                src="/Videos/BAJAVideo.mp4"
                muted
                autoPlay
              />
            </div>

            <div className="lg:w-[600px]  mt-10 lg:mt-0 lg:ml-24">
              <h1
                className="flex items-center text-4xl text-[#FF0000] font-extrabold"
                data-aos="fade-right"
              >
                BAJA SAEINDIA
              </h1>
              <p
                className="mt-5 md:text-lg  text-base text-white"
                data-aos="fade-up-left"
              >
                BAJA SAEINDIA is a renowned national event that challenges
                university students to design, build, and race off-road
                vehicles, promoting teamwork, innovation, and engineering
                skills. NIT Durgapur’s Team NDORS, made up of 25 talented
                students, excelled in the competition, achieving 38th place
                nationwide and ranking 7th among IITs and NITs, reflecting their
                technical expertise and dedication.
              </p>
            </div>
          </div>

          <div className="  flex max-w-full flex-col  rounded-md  lg:flex-row mx-10 my-10 lg:mx-36 lg:my-28 lg:justify-between">
            <div className="h-full w-full lg:h-[400px] lg:w-[590px] ">
              <img
                src="/Images/Screenshot-2024-08-22-095908.png"
                alt="Aarohan"
                className="h-full w-full lg:h-[400px] lg:w-[590px] rounded-md object-center"
                data-aos="fade-right"
              />
            </div>

            <div className="lg:w-[600px]  mt-10 lg:mt-0 lg:ml-24">
              <h1
                className="flex items-center text-4xl text-[#FF0000] font-extrabold"
                data-aos="fade-right"
              >
                SAE IN TEDx
              </h1>
              <p
                className="mt-5 md:text-lg  text-base text-white"
                data-aos="fade-up-left"
              >
              SAE proudly organizes TEDxNITDurgapur as part of the global TED initiative. This significant grassroots effort aims to establish a dynamic platform that unites diverse voices from various fields, fostering the exchange of innovative ideas and perspectives. By bringing together thought leaders, creators, and visionaries, TEDxNITDurgapur aspires to inspire change, spark conversations, and contribute meaningfully to the global dialogue on cutting-edge topics and transformative ideas.
              </p>
            </div>
          </div>

          <div className="  flex max-w-full flex-col  rounded-md  lg:flex-row-reverse mx-10 my-28 lg:mx-36 lg:my-28 lg:justify-between">
            <div className="h-full w-full lg:h-[400px] lg:w-[590px] ">
              {/* <img
                src="../../../Images/6617e9667ea53b0c8bd3b345.jpg" //
                alt="Image"
                className="h-full w-full lg:h-[400px] lg:w-[590px] rounded-md object-center"
                data-aos="fade-left"
              /> */}
              <video
                className="h-full w-full lg:h-[400px] lg:w-[590px] rounded-md object-center"
                data-aos="fade-left"
                loop
                src="/Videos/sdvvideo2.mp4"
                muted
                autoPlay
              />
            </div>

            <div className="lg:w-[600px]  mt-10 lg:mt-0 ">
              <h1
                className="flex items-center text-4xl text-[#ff0000] font-extrabold"
                data-aos="fade-left"
              >
                SDV
              </h1>
              <p
                className="mt-5 text-base md:text-lg md:mr-10 text-white "
                data-aos="fade-up-right"
              >
                SAE’s self-driving vehicle workshop offers an in-depth
                experience in building a prototype autonomous vehicle, ideal for
                tech enthusiasts and aspiring engineers. As autonomous vehicles
                become central to the future of transportation, this workshop
                covers key principles of autonomous driving, robotics, and
                algorithm development. Through hands-on sessions and expert-led
                guidance, participants will engage with the cutting-edge
                technologies propelling the evolution of self-driving systems,
                gaining valuable insights into the innovations shaping
                tomorrow’s mobility landscape.
              </p>
            </div>
          </div>
          <div className="  flex max-w-full flex-col  rounded-md  lg:flex-row mx-10 my-10 lg:mx-36 lg:my-28 lg:justify-between">
            <div className="h-full w-full lg:h-[400px] lg:w-[590px] ">
              <img
                src="../../../Images/dnd5.jpg"
                alt="Aarohan"
                className="h-full w-full lg:h-[400px] lg:w-[590px] rounded-md object-center"
                data-aos="fade-right"
              />
            </div>

            <div className="lg:w-[600px]  mt-10 lg:mt-0 lg:ml-24">
              <h1
                className="flex items-center text-4xl text-[#FF0000] font-extrabold"
                data-aos="fade-right"
              >
                Drag & Drift
              </h1>
              <p
                className="mt-5 md:text-lg text-base text-white"
                data-aos="fade-up-left"
              >
                SAE presents an electrifying event 'Drag & Drift' where participants navigate intricate maze designs filled with challenging obstacles. This event not only tests your ability to skillfully dodge these pesky barriers but also deepens your understanding of the car's underlying mechanics.
              </p>
            </div>
          </div>
          <div className="  flex max-w-full flex-col  rounded-md  lg:flex-row-reverse mx-10 my-28 lg:mx-36 lg:my-28 lg:justify-between">
            <div className="h-full w-full lg:h-[400px] lg:w-[590px] ">
              <video
                className="h-full w-full lg:h-[400px] lg:w-[590px] rounded-md object-center"
                data-aos="fade-left"
                loop
                src="/Videos/AIML_Workshop2.0.mp4"
                muted
                autoPlay
              />
            </div>

            <div className="lg:w-[600px]  mt-10 lg:mt-0 ">
              <h1
                className="flex items-center text-4xl text-[#ff0000] font-extrabold"
                data-aos="fade-left"
              >
                AI ML Workshop
              </h1>
              <p
                className="mt-5 text-base md:text-lg md:mr-10 text-white "
                data-aos="fade-up-right"
              >
                This workshop provides participants with practical, in-depth
                experience in Artificial Intelligence (AI) and Machine Learning
                (ML), focusing on Convolutional Neural Networks (CNNs) and deep
                learning models. Attendees will tackle real-world challenges and
                gain hands-on expertise by designing and implementing neural
                network architectures. They’ll explore applications in image and
                speech recognition, autonomous systems, and data-driven
                decision-making, making it ideal for those seeking to deepen
                their AI and ML knowledge with an emphasis on modern solutions
                and industry standards.
              </p>
            </div>
          </div>
          <div className="  flex max-w-full flex-col  rounded-md  lg:flex-row mx-10 my-10 lg:mx-36 lg:my-28 lg:justify-between">
            <div className="h-full w-full lg:h-[400px] lg:w-[590px] ">
              <img
                src="/Images/FIST.png"
                alt="Aarohan"
                className="h-full w-full lg:h-[400px] lg:w-[590px] rounded-md object-center"
                data-aos="fade-right"
              />
            </div>

            <div className="lg:w-[600px]  mt-10 lg:mt-0 lg:ml-24">
              <h1
                className="flex items-center text-4xl text-[#FF0000] font-extrabold"
                data-aos="fade-right"
              >
                F.I.S.T
              </h1>
              <p
                className="mt-5 md:text-lg  text-base text-white"
                data-aos="fade-up-left"
              >
                Team SAE-NITD’s "Forum for Ideas on Science and Technology"
                (F.I.S.T.) is dedicated to cultivating a research-focused
                environment through engaging webinars and hands-on workshops on
                cutting-edge topics like generative AI. By bringing in industry
                experts, F.I.S.T. bridges crucial knowledge gaps, inspires
                innovation, and empowers students to explore and develop
                technology-based solutions to real-world challenges, fostering a
                spirit of inquiry and advancement.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full ">
          {" "}
          <KnowMoreAbtSae />
        </div>
      </div>
    </>
  );
}

export default About
