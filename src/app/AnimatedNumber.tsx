import React, { useState, useEffect } from "react";

interface AnimatedNumberProps {
  value: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    let animationInterval: NodeJS.Timeout | undefined;

    if (isAnimating) {
      animationInterval = setInterval(() => {
        setAnimatedValue(Math.floor(Math.random() * 900000) + 100000);
      }, 100);
    }

    const timeoutId = setTimeout(() => {
      setIsAnimating(false);
      setAnimatedValue(value);
      if (animationInterval) {
        clearInterval(animationInterval);
      }
    }, 2000);

    return () => {
      if (animationInterval) {
        clearInterval(animationInterval);
      }
      clearTimeout(timeoutId);
    };
  }, [isAnimating, value]);

  const formatNumber = (num: number) => {
    const formattedNum = num.toString().padStart(6, "0");
    return formattedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const displayValue = isAnimating
    ? formatNumber(animatedValue)
    : formatNumber(value);

  return <span className="text-4xl font-bold">{displayValue}</span>;
};

export default AnimatedNumber;
