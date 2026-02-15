import React, { useEffect, useState } from "react";
import CircularClock from "./CircularClock";
// import "./CountdownTimer.css";

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-02-07T18:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      id="timer_container"
      className="flex flex-col justify-center items-center "
    >
      <div>
        <h1 className="font-medium text-3xl md:text-6xl text-[red]">
          Audition Starts in
        </h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8  mt-6 mb-20">
        <CircularClock value={timeLeft.days} label="Days" maxValue={365} />
        <CircularClock value={timeLeft.hours} label="Hours" maxValue={24} />
        <CircularClock value={timeLeft.minutes} label="Minutes" maxValue={60} />
        <CircularClock value={timeLeft.seconds} label="Seconds" maxValue={60} />
      </div>
    </div>
  );
};

export default CountdownTimer;
