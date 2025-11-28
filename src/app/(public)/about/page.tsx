import SimpleCard from "@/component/common/SimpleCard";
import PrimaryLink from "@/component/common/PrimaryLink";
import getServerSessionUser from "@/hooks/useServerSessionUser";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Formify's mission",
};

async function AboutPage() {
  const user = await getServerSessionUser();

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-light-fg-muted to-light-fg dark:from-dark-fg-muted dark:to-dark-fg leading-tight">
          Empowering smarter form creation with AI
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-light-fg-muted dark:text-dark-fg-muted">
          Our mission is to make data collection effortless and elegant. We
          believe in a future where anyone can build powerful, intelligent forms
          in minutes, not hours.
        </p>
        <div className="mt-10 flex items-center justify-center">
          <PrimaryLink
            link={user ? "/dashboard/" + user.dashboard : "/login"}
            className="!text-base px-8 py-4"
          >
            <span className="text-xl">✨</span>
            Try Formify Free
          </PrimaryLink>
        </div>
      </section>

      {/* Why Formify Section */}
      <section className="py-20 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-light-fg dark:text-dark-fg">
            Why Formify?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-light-fg-muted dark:text-dark-fg-muted">
            We&apos;re obsessed with crafting the best form-building experience
            possible.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SimpleCard className="p-8 flex flex-col items-start">
            <div className="w-14 h-14 rounded-2xl bg-light-surface-alt dark:bg-dark-surface-alt flex items-center justify-center mb-4">
              <span className="text-3xl">📱</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-2 text-light-fg dark:text-dark-fg">
              Simplicity
            </h3>
            <p className="text-light-fg-muted dark:text-dark-fg-muted">
              An intuitive, beautiful interface that makes form creation a joy,
              not a chore.
            </p>
          </SimpleCard>

          <SimpleCard className="p-8 flex flex-col items-start">
            <div className="w-14 h-14 rounded-2xl bg-light-surface-alt dark:bg-dark-surface-alt flex items-center justify-center mb-4">
              <span className="text-3xl">🧠</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-2 text-light-fg dark:text-dark-fg">
              Intelligence
            </h3>
            <p className="text-light-fg-muted dark:text-dark-fg-muted">
              Leverage our powerful AI to generate, optimize, and analyze your
              forms.
            </p>
          </SimpleCard>

          <SimpleCard className="p-8 flex flex-col items-start">
            <div className="w-14 h-14 rounded-2xl bg-light-surface-alt dark:bg-dark-surface-alt flex items-center justify-center mb-4">
              <span className="text-3xl">🚀</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-2 text-light-fg dark:text-dark-fg">
              Speed
            </h3>
            <p className="text-light-fg-muted dark:text-dark-fg-muted">
              Go from an idea to a published form in seconds. No more tedious
              manual setup.
            </p>
          </SimpleCard>

          <SimpleCard className="p-8 flex flex-col items-start">
            <div className="w-14 h-14 rounded-2xl bg-light-surface-alt dark:bg-dark-surface-alt flex items-center justify-center mb-4">
              <span className="text-3xl">🛡️</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-2 text-light-fg dark:text-dark-fg">
              Reliability
            </h3>
            <p className="text-light-fg-muted dark:text-dark-fg-muted">
              Built on a secure and scalable infrastructure, so you can collect
              data with confidence.
            </p>
          </SimpleCard>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 md:py-24">
        <SimpleCard className="p-12 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl opacity-60"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-light-fg dark:text-dark-fg">
              Our Vision
            </h2>
            <p className="mt-4 text-lg text-light-fg-muted dark:text-dark-fg-muted max-w-3xl mx-auto">
              We envision a world where technology adapts to human needs, not
              the other way around. Formify is our first step towards this goal,
              making the complex simple and the powerful accessible to everyone.
              We&apos;re committed to building tools that are not only
              functional but also beautifully designed and a pleasure to use.
            </p>
          </div>
        </SimpleCard>
      </section>

      {/* Founders Section */}
      <section className="py-20 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-light-fg dark:text-dark-fg">
            Meet The Developer
          </h2>
        </div>
        <div className="flex items-center justify-center">
          <SimpleCard className="p-8 text-center flex flex-col items-center">
            <Image
              alt="Sandeep"
              className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-light-fg/20 dark:border-dark-fg/20"
              src="/me.jpg"
              width={96}
              height={96}
            />
            <p className="text-xl font-bold text-light-fg dark:text-dark-fg">
              Sandeep
            </p>
            <p className="text-sm text-brand-primary mb-3">
              Developer of Formify
            </p>
            <p className="text-light-fg-muted max-w-3xl dark:text-dark-fg-muted">
              Full Stack Web Developer who works with React, Next.js, and modern
              backend tools. Building Formify, an AI-powered form builder
              designed to make form creation simple and fast. I focus on
              practical, clean code and creating products that feel smooth to
              use.
            </p>
          </SimpleCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24">
        <SimpleCard className="p-12 text-center relative overflow-hidden">
          <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/5 to-blue-500/5 dark:from-purple-500/10 dark:to-blue-500/10 -z-10 rounded-xl"></div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-light-fg dark:text-dark-fg">
            Join us on our journey
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-light-fg-muted dark:text-dark-fg-muted">
            Ready to experience the future of form building? Create your first
            AI-powered form in seconds.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <PrimaryLink
              link={user ? "/dashboard/" + user.dashboard : "/login"}
              className="!text-base px-8 py-4"
            >
              Get Started Free
            </PrimaryLink>
          </div>
        </SimpleCard>
      </section>
    </div>
  );
}

export default AboutPage;
