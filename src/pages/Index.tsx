import { Helmet } from "react-helmet-async";
import SmartBodyAnalyzer from "@/components/SmartBodyAnalyzer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Smart Body Analyzer | AI-Powered BMI Calculator</title>
        <meta 
          name="description" 
          content="Calculate your BMI with our premium Smart Body Analyzer. Get personalized fitness insights and start your transformation journey today." 
        />
      </Helmet>
      <SmartBodyAnalyzer />
    </>
  );
};

export default Index;
