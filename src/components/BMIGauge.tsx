import { useEffect, useState } from "react";

interface BMIGaugeProps {
  bmi: number | null;
  category: string;
}

const BMIGauge = ({ bmi, category }: BMIGaugeProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  // Calculate progress based on BMI (range 10-40)
  const getProgress = (bmiValue: number) => {
    const minBMI = 10;
    const maxBMI = 40;
    const clampedBMI = Math.max(minBMI, Math.min(maxBMI, bmiValue));
    return ((clampedBMI - minBMI) / (maxBMI - minBMI)) * 100;
  };

  const getGaugeClass = () => {
    switch (category) {
      case "Underweight":
        return "gauge-underweight";
      case "Normal":
        return "gauge-normal";
      case "Overweight":
        return "gauge-overweight";
      case "Obese":
        return "gauge-obese";
      default:
        return "gauge-normal";
    }
  };

  useEffect(() => {
    if (bmi !== null) {
      const targetProgress = getProgress(bmi);
      setAnimatedProgress(0);
      const timer = setTimeout(() => {
        setAnimatedProgress(targetProgress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedProgress(0);
    }
  }, [bmi]);

  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  return (
    <div className="relative w-56 h-56 mx-auto">
      {/* Background circle */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`${getGaugeClass()} transition-all duration-1000 ease-out`}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold text-foreground">
          {bmi !== null ? bmi.toFixed(1) : "--"}
        </span>
        <span className="text-sm text-muted-foreground mt-1">BMI</span>
        {bmi !== null && (
          <span 
            className={`text-sm font-semibold mt-2 px-3 py-1 rounded-full animate-scale-in ${
              category === "Underweight" ? "bg-bmi-underweight/20 text-bmi-underweight" :
              category === "Normal" ? "bg-bmi-normal/20 text-bmi-normal" :
              category === "Overweight" ? "bg-bmi-overweight/20 text-bmi-overweight" :
              "bg-bmi-obese/20 text-bmi-obese"
            }`}
          >
            {category}
          </span>
        )}
      </div>
    </div>
  );
};

export default BMIGauge;
