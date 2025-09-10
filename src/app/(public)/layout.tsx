import PublicHeader from "@/app/(public)/_component/layout/Header";
import Container from "@/component/layout/Container";
import Footer from "@/app/(public)/_component/layout/Footer";

import type { MarketingLayoutProps } from "@/types";

export default function MarketingLayout({
  children,
}: Readonly<MarketingLayoutProps>) {
  return (
    <div className="grid grid-rows-[1fr_auto] min-h-screen">
      <PublicHeader />
      <div className="pt-20">
        <Container>{children}</Container>
      </div>
      <Footer />
    </div>
  );
}
