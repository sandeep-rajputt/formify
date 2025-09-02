import PublicHeader from "@/app/(public)/component/layout/Header";
import Container from "@/component/layout/Container";
import Footer from "@/app/(public)/component/layout/Footer";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
