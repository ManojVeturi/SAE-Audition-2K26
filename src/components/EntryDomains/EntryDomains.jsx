import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptopCode,
  faCalendarAlt,
  faPalette,
  faCamera,
  faRobot,
  faFilm,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import "./EntryDomains.css";

const EntryDomains = () => {
  return (
    <div className="domain-container ">
      <h1 className="font-medium text-3xl md:text-6xl text-[red]">Domains</h1>
      <div className="domain-cards">
        <div className="domain-card">
          <div className="domain-icon">
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faCar} />
            <p className="title">Automobile</p>
          </div>
          {/* <a href="#" className="count">
            open positions
          </a> */}
        </div>
        <div className="domain-card ">
          <div className="domain-icon">
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faRobot} />
            <p className="title">Robotics/ML</p>
          </div>
          {/* <div className="count" id="default-selected">
            open positions
          </div> */}
        </div>
        <div className="domain-card">
          <div className="domain-icon">
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faLaptopCode} />
            <p className="title">Web Developer</p>
          </div>
          {/* <div className="count">open positions</div> */}
        </div>
        <div className="domain-card">
          <div className="domain-icon">
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faCalendarAlt} />
            <p className="title">Event Management</p>
          </div>
          {/* <div className="count">open positions</div> */}
        </div>
        <div className="domain-card">
          <div className="domain-icon">
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faPalette} />
            <p className="title">Graphic Design</p>
          </div>
          {/* <div className="count">open positions</div> */}
        </div>
        <div className="domain-card">
          <div className="domain-icon">
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faFilm} />
            <p className="title">Video Editing</p>
          </div>
          {/* <div className="count">open positions</div> */}
        </div>
        {/* <div className="domain-card">
          <div className="domain-icon">
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faCamera} />
            <p className="title">Photography</p>
          </div>
          <div className="count">open positions</div>
        </div> */}
      </div>
    </div>
  );
};

export default EntryDomains;
