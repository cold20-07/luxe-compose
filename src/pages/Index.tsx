import { useState } from "react";
import { Hero } from "@/components/Hero";
import { EmailCreator } from "@/components/EmailCreator";

const Index = () => {
  const [showCreator, setShowCreator] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {!showCreator ? (
        <Hero onStartClick={() => setShowCreator(true)} />
      ) : (
        <EmailCreator onBack={() => setShowCreator(false)} />
      )}
    </div>
  );
};

export default Index;
