import React, { useEffect } from "react";
import "./Timeline.css";

const Timeline = () => {
  useEffect(() => {
    const timeline = document.querySelector(".timeline");
    const timelineContainers = document.querySelectorAll(".timeline-container");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            timeline.classList.add("show-line");
            timeline.classList.remove("hide-line");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.8 }
    );

    timelineContainers.forEach((container) => observer.observe(container));

    const handleScroll = () => {
      const timelineRect = timeline.getBoundingClientRect();
      const top = timelineRect.top;
      const bottom = timelineRect.bottom;

      if (top > window.innerHeight / 2 || bottom < window.innerHeight / 2) {
        timeline.classList.remove("show-line");
        timeline.classList.add("hide-line");
      } else {
        timeline.classList.add("show-line");
        timeline.classList.remove("hide-line");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full h-auto font-serif audition-flow-container">
      <h1 className="font-medium text-3xl md:text-6xl bg-clip-text text-[red] text-center mb-7">
        Audition Flow
      </h1>
      <div className="timeline hide-line">
        <div className="timeline-container left">
          <div className="timelinecontent-link">
            <div className="timeLineContent">Pen-Paper Round & Introduction</div>
          </div>
        </div>
        <div className="timeline-container right">
          <div className="timelinecontent-link">
            <div className="timeLineContent">Task Review & Problem Solving</div>
          </div>
        </div>
        <div className="timeline-container left">
          <div className="timelinecontent-link">
            <div className="timeLineContent">
              Event Design & Team Collaboration
            </div>
          </div>
        </div>
        <div className="timeline-container right">
          <div className="timelinecontent-link">
            <div className="timeLineContent">Final Interview</div>
          </div>
        </div>
        {/* <div className="timeline-container left">
          <div className="timelinecontent-link">
            <div className="timeLineContent">Final Interview</div>
          </div>
        </div> */}
        {/* Welcome to the Club card */}
        <div className="timeline-container center">
          <div className="timelinecontent-link">
            <div className="timeLineContent welcome-card">
              WELCOME TO THE CLUB
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;