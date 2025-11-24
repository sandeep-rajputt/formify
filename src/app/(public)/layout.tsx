import PublicHeader from "@/app/(public)/_component/layout/Header";
import Container from "@/component/layout/Container";
import Footer from "@/app/(public)/_component/layout/Footer";

import type { MarketingLayoutProps } from "@/types";

export default function MarketingLayout({
  children,
}: Readonly<MarketingLayoutProps>) {
  return (
    <div className="min-h-screen w-full relative dark:bg-black">
      {/* Northern Aurora */}
      <div
        className="absolute inset-0 z-0 dark:block hidden pointer-events-none"
        style={{
          backgroundImage: `
        radial-gradient(ellipse 80% 60% at 15% 15%, rgba(139, 92, 246, 0.15), transparent 50%),
        radial-gradient(ellipse 70% 55% at 85% 20%, rgba(59, 130, 246, 0.12), transparent 50%),
        radial-gradient(ellipse 75% 60% at 20% 85%, rgba(168, 85, 247, 0.10), transparent 50%),
        radial-gradient(ellipse 65% 50% at 90% 90%, rgba(14, 165, 233, 0.08), transparent 50%)`,
        }}
      />

      <div
        className="absolute inset-0 z-0 dark:hidden block pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 60% at 15% 15%, rgba(139, 92, 246, 0.08), transparent 50%),
                    radial-gradient(ellipse 70% 55% at 85% 20%, rgba(59, 130, 246, 0.06), transparent 50%),
                    radial-gradient(ellipse 75% 60% at 20% 85%, rgba(168, 85, 247, 0.05), transparent 50%),
                    radial-gradient(ellipse 65% 50% at 90% 90%, rgba(14, 165, 233, 0.04), transparent 50%)`,
        }}
      />
      <div className="grid grid-rows-[1fr_auto] min-h-screen z-10">
        <PublicHeader />
        <div className="pt-20">
          <Container>{children}</Container>
        </div>
        <Footer />
      </div>
    </div>
  );
}

// {/* <div className="min-h-screen w-full relative">
//   {/* Radial Gradient Background from Bottom */}
//   <div
//     className="absolute inset-0 z-0"
//     style={{
//       background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #7c3aed 100%)",
//     }}
//   />
//   {/* Your Content/Components */}
// </div> */}
