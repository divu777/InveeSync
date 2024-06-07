import React, { useState, useEffect } from "react";

const AnimatedNumber = ({ value }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    let animationInterval;

    if (isAnimating) {
      animationInterval = setInterval(() => {
        setAnimatedValue(Math.floor(Math.random() * 900000) + 100000);
      }, 100);
    } else {
      clearInterval(animationInterval);
    }

    const timeoutId = setTimeout(() => {
      setIsAnimating(false);
      setAnimatedValue(value);
    }, 2000);

    return () => {
      clearInterval(animationInterval);
      clearTimeout(timeoutId);
    };
  }, [isAnimating, value]);

  const formatNumber = (num) => {
    const formattedNum = num.toString().padStart(6, "0");
    return formattedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const displayValue = isAnimating
    ? formatNumber(animatedValue)
    : formatNumber(value);

  return <span className="text-4xl font-bold">{displayValue}</span>;
};

export default AnimatedNumber;
