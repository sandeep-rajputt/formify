import { FaChevronDown } from "react-icons/fa";

function FaqSection() {
  return (
    <section className="py-20 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <details className="rounded-xl border dark:border-dark-fg/5 border-light-fg/10 dark:bg-dark-fg/5 bg-dark-fg/20 dark:text-dark-fg text-light-fg p-4 backdrop-blur-2xl group">
            <summary className="flex justify-between items-center gap-2 font-semibold cursor-pointer">
              <span>Is Formify completely free to use?</span>
              <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                <FaChevronDown />
              </span>
            </summary>
            <p className="mt-4 text-soft-gray">
              Yes! 🎉, Formify is 100% free — no subscriptions, no paid plans,
              and no hidden charges. You can create as many forms as you want
              without limitations.
            </p>
          </details>
          <details className="rounded-xl border dark:border-dark-fg/5 border-light-fg/10 dark:bg-dark-fg/5 bg-dark-fg/20 dark:text-dark-fg text-light-fg p-4 backdrop-blur-2xl group">
            <summary className="flex justify-between items-center font-semibold cursor-pointer">
              <span>Can I edit the form after AI generates it?</span>
              <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                <FaChevronDown />
              </span>
            </summary>
            <p className="mt-4 text-soft-gray">
              Yes! You can modify field names, descriptions, types, and settings
              anytime. AI gives you a starting point, but you can refine
              everything manually.
            </p>
          </details>
          <details className="rounded-xl border dark:border-dark-fg/5 border-light-fg/10 dark:bg-dark-fg/5 bg-dark-fg/20 dark:text-dark-fg text-light-fg p-4 backdrop-blur-2xl group">
            <summary className="flex justify-between items-center font-semibold cursor-pointer">
              <span>How does the AI form generation work?</span>
              <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                <FaChevronDown />
              </span>
            </summary>
            <p className="mt-4 text-soft-gray">
              You simply describe the purpose of your form in natural language.
              Our AI analyzes your request and automatically generates the most
              relevant form fields, questions to get you started in seconds.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
