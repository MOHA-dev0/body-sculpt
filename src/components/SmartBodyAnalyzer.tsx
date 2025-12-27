import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import BMIGauge from "./BMIGauge";
import BodySilhouette from "./BodySilhouette";
import StatCard from "./StatCard";
import MembershipPlans from "./MembershipPlans";
import { Activity, Target, Scale, Sparkles, ArrowRight, Zap, ChevronDown } from "lucide-react";

type PlanType = "fat-loss" | "fitness" | "muscle-gain" | null;

const SmartBodyAnalyzer = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [recommendedPlan, setRecommendedPlan] = useState<PlanType>(null);
  
  const membershipRef = useRef<HTMLDivElement>(null);

  const getRecommendedPlan = (cat: string): PlanType => {
    switch (cat) {
      case "Underweight":
        return "muscle-gain";
      case "Normal":
        return "fitness";
      case "Overweight":
      case "Obese":
        return "fat-loss";
      default:
        return null;
    }
  };

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    
    if (h > 0 && w > 0) {
      const heightInMeters = h / 100;
      const calculatedBMI = w / (heightInMeters * heightInMeters);
      setBmi(parseFloat(calculatedBMI.toFixed(2)));
      
      let cat = "";
      let msg = "";
      
      if (calculatedBMI < 18.5) {
        cat = "Underweight";
        msg = "Your journey to strength starts here. Let's build you up with proper nutrition and training.";
      } else if (calculatedBMI < 25) {
        cat = "Normal";
        msg = "You're in a healthy range. Consistency will take you further. Keep pushing your limits!";
      } else if (calculatedBMI < 30) {
        cat = "Overweight";
        msg = "Every step counts. With the right plan, you'll reach your goals faster than you think.";
      } else {
        cat = "Obese";
        msg = "Your transformation begins today. We're here to guide you every step of the way.";
      }
      
      setCategory(cat);
      setMessage(msg);
      setRecommendedPlan(getRecommendedPlan(cat));
      setShowResults(true);
    }
  };

  const scrollToMembership = () => {
    membershipRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  };

  const getIdealWeight = () => {
    const h = parseFloat(height);
    if (h > 0) {
      const heightInMeters = h / 100;
      const minWeight = (18.5 * heightInMeters * heightInMeters).toFixed(1);
      const maxWeight = (24.9 * heightInMeters * heightInMeters).toFixed(1);
      return `${minWeight} - ${maxWeight} kg`;
    }
    return "-- kg";
  };

  const handleInputChange = () => {
    if (showResults) {
      setShowResults(false);
      setBmi(null);
      setCategory("");
      setRecommendedPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-8 md:py-16 min-h-screen flex flex-col">
          {/* Header */}
          <header className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Analysis</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">Smart Body</span>
              <br />
              <span className="text-foreground">Analyzer</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Discover your body metrics with precision. Your journey to peak fitness starts here.
            </p>
          </header>

          <div className="max-w-5xl mx-auto flex-1">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Input Section */}
              <div className="glass-card p-8 animate-slide-up">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Body Metrics</h2>
                    <p className="text-sm text-muted-foreground">Enter your measurements</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => {
                        setHeight(e.target.value);
                        handleInputChange();
                      }}
                      placeholder="175"
                      className="w-full h-14 px-4 rounded-xl bg-input border border-border text-foreground text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent input-glow transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => {
                        setWeight(e.target.value);
                        handleInputChange();
                      }}
                      placeholder="70"
                      className="w-full h-14 px-4 rounded-xl bg-input border border-border text-foreground text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent input-glow transition-all duration-300"
                    />
                  </div>

                  <Button 
                    onClick={calculateBMI}
                    variant="glow"
                    size="lg"
                    className="w-full"
                    disabled={!height || !weight}
                  >
                    <Zap className="w-5 h-5" />
                    Analyze My Body
                  </Button>
                </div>

                {/* Body Silhouette */}
                <div className="mt-8 pt-8 border-t border-border">
                  <BodySilhouette category={category} />
                </div>
              </div>

              {/* Results Section */}
              <div className="space-y-6">
                {/* BMI Gauge Card */}
                <div className="glass-card p-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
                  <BMIGauge bmi={bmi} category={category} />
                  
                  {showResults && (
                    <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20 animate-scale-in">
                      <p className="text-foreground text-center leading-relaxed">
                        {message}
                      </p>
                    </div>
                  )}
                </div>

                {/* Stats Grid */}
                {showResults && (
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard
                      icon={<Target className="w-5 h-5" />}
                      label="Ideal BMI Range"
                      value="18.5 - 24.9"
                      delay={200}
                    />
                    <StatCard
                      icon={<Scale className="w-5 h-5" />}
                      label="Healthy Weight"
                      value={getIdealWeight()}
                      delay={300}
                    />
                  </div>
                )}

                {/* CTA Buttons */}
                {showResults && (
                  <div className="space-y-3 animate-slide-up" style={{ animationDelay: "400ms" }}>
                    <Button 
                      variant="glow" 
                      size="lg" 
                      className="w-full"
                      onClick={scrollToMembership}
                    >
                      Start Your Fitness Journey
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full"
                      onClick={scrollToMembership}
                    >
                      View Membership Plans
                    </Button>
                  </div>
                )}

                {/* Disclaimer */}
                <p className="text-xs text-muted-foreground text-center px-4 animate-fade-in" style={{ animationDelay: "500ms" }}>
                  This result is for guidance only and not a medical diagnosis. Consult a healthcare professional for personalized advice.
                </p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          {showResults && (
            <div className="flex justify-center mt-8 animate-bounce">
              <button 
                onClick={scrollToMembership}
                className="p-3 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors"
              >
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>

        {/* Membership Plans Section */}
        <MembershipPlans ref={membershipRef} recommendedPlan={recommendedPlan} />
      </div>
    </div>
  );
};

export default SmartBodyAnalyzer;
