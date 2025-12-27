import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isRecommended?: boolean;
  accentColor: string;
  delay?: number;
}

const PricingCard = ({
  name,
  price,
  period,
  description,
  features,
  isRecommended = false,
  accentColor,
  delay = 0,
}: PricingCardProps) => {
  return (
    <div
      className={`relative glass-card p-8 animate-slide-up transition-all duration-500 ${
        isRecommended
          ? "scale-105 border-2 border-primary shadow-2xl shadow-primary/20"
          : "hover:scale-[1.02]"
      }`}
      style={{ 
        animationDelay: `${delay}ms`,
        ...(isRecommended && {
          boxShadow: "0 0 60px hsl(var(--primary) / 0.3), 0 0 120px hsl(var(--primary) / 0.1)"
        })
      }}
    >
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-2 animate-pulse-glow">
          <Sparkles className="w-4 h-4" />
          Recommended for You
        </div>
      )}

      {/* Glow effect for recommended */}
      {isRecommended && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      )}

      <div className="relative">
        {/* Plan Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
          style={{ backgroundColor: `${accentColor}20` }}
        >
          <div
            className="w-8 h-8 rounded-lg"
            style={{ backgroundColor: accentColor }}
          />
        </div>

        {/* Plan Name */}
        <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm mb-6">{description}</p>

        {/* Price */}
        <div className="mb-8">
          <span className="text-4xl font-bold text-foreground">{price}</span>
          <span className="text-muted-foreground">/{period}</span>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 shrink-0"
                style={{ backgroundColor: `${accentColor}20` }}
              >
                <Check className="w-3 h-3" style={{ color: accentColor }} />
              </div>
              <span className="text-foreground/80 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          variant={isRecommended ? "glow" : "outline"}
          size="lg"
          className="w-full"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
