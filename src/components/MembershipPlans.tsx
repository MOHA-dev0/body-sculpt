import { forwardRef } from "react";
import PricingCard from "./PricingCard";
import { Flame, Dumbbell, TrendingUp } from "lucide-react";

interface MembershipPlansProps {
  recommendedPlan: "fat-loss" | "fitness" | "muscle-gain" | null;
}

const MembershipPlans = forwardRef<HTMLDivElement, MembershipPlansProps>(
  ({ recommendedPlan }, ref) => {
    const plans = [
      {
        id: "fat-loss",
        name: "Fat Loss Plan",
        price: "$49",
        period: "month",
        description: "Transform your body with targeted fat-burning workouts",
        accentColor: "hsl(0, 80%, 55%)",
        features: [
          "Personalized cardio programs",
          "HIIT training sessions",
          "Nutrition guidance for fat loss",
          "Weekly body composition tracking",
          "Access to fat-burning classes",
          "1-on-1 coaching session monthly",
        ],
      },
      {
        id: "fitness",
        name: "Fitness Plan",
        price: "$59",
        period: "month",
        description: "Maintain your health with balanced fitness routines",
        accentColor: "hsl(156, 100%, 50%)",
        features: [
          "Full gym equipment access",
          "Group fitness classes",
          "Personalized workout plans",
          "Nutrition consultation",
          "Fitness app with tracking",
          "2 personal training sessions monthly",
        ],
      },
      {
        id: "muscle-gain",
        name: "Muscle Gain Plan",
        price: "$69",
        period: "month",
        description: "Build strength and muscle with expert-designed programs",
        accentColor: "hsl(45, 100%, 55%)",
        features: [
          "Strength training programs",
          "Muscle hypertrophy workouts",
          "High-protein nutrition plans",
          "Supplement guidance",
          "Progress photo tracking",
          "4 personal training sessions monthly",
        ],
      },
    ];

    return (
      <section
        ref={ref}
        id="membership-plans"
        className="py-24 px-4 relative overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Choose Your Path
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Membership</span>{" "}
              <span className="text-gradient">Plans</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              {recommendedPlan
                ? "Based on your BMI analysis, we've highlighted the best plan for your goals."
                : "Select the perfect plan to kickstart your fitness transformation."}
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, index) => (
              <PricingCard
                key={plan.id}
                name={plan.name}
                price={plan.price}
                period={plan.period}
                description={plan.description}
                features={plan.features}
                accentColor={plan.accentColor}
                isRecommended={recommendedPlan === plan.id}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <p className="text-muted-foreground text-sm mb-4">
              All plans include a 7-day free trial. No commitment required.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-primary" />
                Cancel anytime
              </span>
              <span className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-primary" />
                24/7 Support
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

MembershipPlans.displayName = "MembershipPlans";

export default MembershipPlans;
