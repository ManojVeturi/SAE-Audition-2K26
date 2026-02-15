import React, { useEffect, useRef } from "react";

const CircularClock = ({ value, label, maxValue }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const radius = width / 2;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 5, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(166,4,4,0.2)";
    ctx.lineWidth = 10;
    ctx.stroke();

    // Draw progress
    const progress = value / maxValue;
    ctx.beginPath();
    ctx.arc(
      centerX,
      centerY,
      radius - 5,
      -Math.PI / 2,
      -Math.PI / 2 + 2 * Math.PI * progress
    );
    ctx.strokeStyle = "red";
    ctx.lineWidth = 10;
    ctx.stroke();

    // Draw ticks
    for (let i = 0; i < maxValue; i++) {
      const angle = (i / maxValue) * (2 * Math.PI) - Math.PI / 2;
      const innerRadius = radius - 15;
      const outerRadius = radius - 5;
      const startX = centerX + innerRadius * Math.cos(angle);
      const startY = centerY + innerRadius * Math.sin(angle);
      const endX = centerX + outerRadius * Math.cos(angle);
      const endY = centerY + outerRadius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = i < value ? "rgb(166,4,4)" : "rgba(166,4,4,0.2)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Draw needle
    const needleAngle = (value / maxValue) * 2 * Math.PI - Math.PI / 2;
    const needleLength = radius - 20;
    const needleEndX = centerX + needleLength * Math.cos(needleAngle);
    const needleEndY = centerY + needleLength * Math.sin(needleAngle);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(needleEndX, needleEndY);
    ctx.strokeStyle = "rgb(255, 11, 11)";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw center dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(255, 11, 11)";
    ctx.fill();
  }, [value, maxValue]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={100} height={100} className="mb-2" />
      <p id="time" className="text-white font-bold text-3xl m-0">
        {value}
      </p>
      <p className="text-white text-sm">{label}</p>
    </div>
  );
};

export default CircularClock;
