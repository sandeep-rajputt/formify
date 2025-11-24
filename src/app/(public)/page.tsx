import HeroSection from "@/app/(public)/_component/sections/HeroSection";
import FeaturesSection from "./_component/sections/FeaturesSection";
import HowItWorks from "./_component/sections/HowItWorks";
import BuiltForEveryone from "./_component/sections/BuiltForEveryone";
import FaqSection from "./_component/sections/FaqSection";

export default function Page() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <BuiltForEveryone />
      <FaqSection />
    </div>
  );
}
