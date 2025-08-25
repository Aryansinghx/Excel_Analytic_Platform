// src/components/LottieContainer.jsx
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animation1 from "../assets/animation1.json";
import animation2 from "../assets/animation2.json";
import animation3 from "../assets/animation3.json";
import animation4 from "../assets/animation4.json";

const animations = [animation1, animation2, animation3, animation4];

const LottieContainer = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % animations.length);
    }, 5000); // Change animation every 5 sec
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-3/4">
      <Lottie animationData={animations[index]} loop={true} />
    </div>
  );
};

export default LottieContainer; 