import React, { useState, useEffect, useRef } from "react";
import "./Carousal.css"; // Add your CSS here

const Carousal = () => {
  const media = [
    {
      type: "image",
      src: "../../../Images/IMG_20240408_200738.jpg",
      caption: "AAROHAN",
    },
    {
      type: "image",
      src: "../../../Images/DSC_0125.JPG",
      caption: "BAJA",
    },
    {
      type: "image",
      src: "../../../Images/TEDxAudition.jpg",
      caption: "TEDx",
    },
    {
      type: "image",
      src: "../../../Images/_DSC4210.JPG",
      caption: "SDV",
    },
    {
      type: "video",
      src: "../../../Videos/dnd.mp4",
      caption: "DnD",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  const showSlide = (index) => {
    setCurrentIndex(index < 0 ? media.length - 1 : index % media.length);
  };

  const handleLeftArrowClick = () => {
    showSlide(currentIndex - 1);
  };

  const handleRightArrowClick = () => {
    showSlide(currentIndex + 1);
  };

  useEffect(() => {
    if (media[currentIndex].type === "video" && videoRef.current) {
      videoRef.current.play();
    } else {
      const interval = setInterval(() => {
        showSlide(currentIndex + 1);
      }, 5000); // Auto-slide interval for images

      return () => clearInterval(interval);
    }
  }, [currentIndex]);

  const handleVideoEnded = () => {
    showSlide(currentIndex + 1);
  };

  return (
    <div className="abtcarousalcontainer overflow-hidden">
      <div
        className="abtcarousalarrow abtcarousalarrow-left"
        onClick={handleLeftArrowClick}
      >
        <i className="fas fa-chevron-circle-left"></i>
      </div>
      {media.map((item, index) => (
        <div
          key={index}
          className="slide"
          style={{ display: index === currentIndex ? "block" : "none" }}
        >
          {item.type === "image" ? (
            <img src={item.src} alt={`Slide ${index + 1}`} />
          ) : (
            <video
              ref={videoRef}
              src={item.src}
              onEnded={handleVideoEnded}
              muted
              autoPlay
              // controls
            />
          )}
          <div className="abtcarousalcaption">{item.caption}</div>
        </div>
      ))}
      <div
        className="abtcarousalarrow abtcarousalarrow-right"
        onClick={handleRightArrowClick}
      >
        <i className="fas fa-chevron-circle-right"></i>
      </div>
      <div className="abtcarousaldots">
        {media.map((_, index) => (
          <div
            className="abtcarousaldot"
            key={index}
            onClick={() => showSlide(index)}
          >
            <i
              className={`far ${
                index === currentIndex ? "fa-dot-circle" : "fa-circle"
              }`}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousal;
