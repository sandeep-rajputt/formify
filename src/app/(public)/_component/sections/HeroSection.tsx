import PrimaryLink from "@/component/common/PrimaryLink";
import SimpleLink from "@/component/common/SimpleLink";
import getServerSessionUser from "@/hooks/useServerSessionUser";

async function HeroSection() {
  const user = await getServerSessionUser();
  return (
    <div className="flex flex-col items-center justify-center pt-20 gap-10">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-4xl text-center md:text-7xl xxs:text-5xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-light-fg-muted to-light-fg dark:from-dark-fg-muted dark:to-dark-fg leading-tight">
          Build smart forms <br />
          faster with AI
        </h1>
        <p className=" text-center md:max-w-2xl max-w-lg mx-auto text-lg text-light-fg-muted dark:text-dark-fg-muted">
          From simple surveys to complex registration forms, Formify&apos;s AI
          assistant helps you create, customize, and analyze forms in minutes.
          No coding required.
        </p>
      </div>
      <div className="flex xs:flex-row flex-col  items-center justify-center gap-5 mt-5">
        <PrimaryLink
          link={user ? "/dashboard/" + user.dashboard : "/login"}
          className="!text-lg px-7 py-3.5"
        >
          Create Your First Form
        </PrimaryLink>
        <SimpleLink
          link="#how-it-works"
          className="!text-lg text-center !w-fit px-7 py-3.5 !rounded-full bg-light-surface-alt/70 dark:bg-dark-surface-alt"
        >
          How it works
        </SimpleLink>
      </div>
    </div>
  );
}

export default HeroSection;
