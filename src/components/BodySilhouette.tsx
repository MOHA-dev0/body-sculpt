interface BodySilhouetteProps {
  category: string;
}

const BodySilhouette = ({ category }: BodySilhouetteProps) => {
  const getBodyStyle = () => {
    switch (category) {
      case "Underweight":
        return { scaleX: 0.8, color: "hsl(var(--bmi-underweight))" };
      case "Normal":
        return { scaleX: 1, color: "hsl(var(--bmi-normal))" };
      case "Overweight":
        return { scaleX: 1.15, color: "hsl(var(--bmi-overweight))" };
      case "Obese":
        return { scaleX: 1.3, color: "hsl(var(--bmi-obese))" };
      default:
        return { scaleX: 1, color: "hsl(var(--muted-foreground))" };
    }
  };

  const style = getBodyStyle();

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 100 200"
        className="w-24 h-48 transition-all duration-700 ease-out"
        style={{ 
          transform: `scaleX(${style.scaleX})`,
          filter: `drop-shadow(0 0 15px ${style.color}40)`
        }}
      >
        {/* Head */}
        <circle
          cx="50"
          cy="20"
          r="15"
          fill="none"
          stroke={style.color}
          strokeWidth="2"
          className="transition-all duration-500"
        />
        
        {/* Neck */}
        <line
          x1="50"
          y1="35"
          x2="50"
          y2="45"
          stroke={style.color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Body/Torso */}
        <ellipse
          cx="50"
          cy="85"
          rx="25"
          ry="40"
          fill="none"
          stroke={style.color}
          strokeWidth="2"
          className="transition-all duration-500"
        />
        
        {/* Left Arm */}
        <path
          d="M 25 55 Q 10 75 15 100"
          fill="none"
          stroke={style.color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Right Arm */}
        <path
          d="M 75 55 Q 90 75 85 100"
          fill="none"
          stroke={style.color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Left Leg */}
        <path
          d="M 38 125 Q 35 155 30 190"
          fill="none"
          stroke={style.color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Right Leg */}
        <path
          d="M 62 125 Q 65 155 70 190"
          fill="none"
          stroke={style.color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      
      <p className="text-sm text-muted-foreground mt-4 text-center">
        {category === "Underweight" && "Slim Build"}
        {category === "Normal" && "Balanced Build"}
        {category === "Overweight" && "Heavy Build"}
        {category === "Obese" && "Very Heavy Build"}
        {!category && "Enter your data"}
      </p>
    </div>
  );
};

export default BodySilhouette;
