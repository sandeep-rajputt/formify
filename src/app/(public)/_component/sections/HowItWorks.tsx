import SimpleCard from "@/component/common/SimpleCard";

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-24 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-light-fg dark:text-dark-fg">
          How it works
        </h2>
        <p className="max-w-2xl mx-auto  text-lg text-light-fg-muted dark:text-dark-fg-muted mb-40">
          Generate, customize, and publish your form in three simple steps.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-4 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-12">
            <svg height="2" width="100%">
              <line
                stroke="#d1d5db"
                strokeDasharray="8 8"
                strokeWidth="2"
                x1="0"
                x2="100%"
                y1="1"
                y2="1"
              ></line>
            </svg>
          </div>
          <div className="relative flex flex-col items-center">
            <SimpleCard className="!rounded-full px-6.5 -mt-10 md:mb-10 mb-5">
              <span className="text-4xl">1</span>
            </SimpleCard>
            <h3 className="text-xl font-bold mb-2 text-light-fg dark:text-dark-fg">
              Describe Your Form
            </h3>
            <p className="text-light-fg-muted max-w-sm dark:text-dark-fg-muted px-4">
              Tell our AI what you need. For example, &quot;A registration form
              for a marketing webinar.&quot;
            </p>
          </div>
          <div className="relative flex flex-col items-center">
            <SimpleCard className="!rounded-full px-6.5 -mt-10 md:mb-10 mb-5">
              <span className="text-4xl">2</span>
            </SimpleCard>
            <h3 className="text-xl font-bold mb-2 text-light-fg dark:text-dark-fg">
              Generate &amp; Refine
            </h3>
            <p className="text-light-fg-muted max-w-sm dark:text-dark-fg-muted px-4">
              Watch as the AI builds your form. Easily add, remove, or edit
              fields as needed.
            </p>
          </div>
          <div className="relative flex flex-col items-center">
            <SimpleCard className="!rounded-full px-6.5 -mt-10 md:mb-10 mb-5">
              <span className="text-4xl">3</span>
            </SimpleCard>
            <h3 className="text-xl font-bold mb-2 text-light-fg dark:text-dark-fg">
              Publish &amp; Share
            </h3>
            <p className="text-light-fg-muted max-w-sm dark:text-dark-fg-muted px-4">
              Embed the form on your site or share a direct link to start
              collecting responses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
