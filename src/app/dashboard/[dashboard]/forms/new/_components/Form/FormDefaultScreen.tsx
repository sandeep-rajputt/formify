import AddFormField from "@/app/dashboard/[dashboard]/forms/new/_components/Form/AddFormField";

function FormDefaultScreen({
  disableScroll,
  enableScroll,
}: {
  disableScroll: () => void;
  enableScroll: () => void;
}) {
  return (
    <div className="min-h-[500px] flex items-center justify-center p-8 sm:py-8 py-14">
      <div className="max-w-md w-full">
        {/* Main Content Container */}
        <div className="text-center space-y-6">
          {/* Icon Container */}
          <div className="mx-auto w-20 h-20 bg-light-surface-alt dark:bg-dark-surface-alt rounded-2xl flex items-center justify-center border border-light-fg/5 dark:border-dark-fg/5">
            <svg
              className="w-10 h-10 text-light-fg/40 dark:text-dark-fg/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-light-fg dark:text-dark-fg">
              Create Your Form
            </h2>
            <p className="text-light-fg/60 dark:text-dark-fg/60 text-base leading-relaxed">
              Start building your form by adding your first field. Choose from
              various input types to collect the information you need.
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <AddFormField
              disableScroll={disableScroll}
              enableScroll={enableScroll}
              fieldIndex={0}
            />
          </div>

          {/* Feature Hints */}
          <div className="pt-4 space-y-3">
            <div className="flex sm:flex-row flex-col sm:gap-5 gap-2 items-center justify-center text-sm text-light-fg/50 dark:text-dark-fg/50">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-brand-primary rounded-full"></div>
                <span>Multiple Field Types</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-brand-primary rounded-full"></div>
                <span>Easy Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-brand-primary rounded-full"></div>
                <span>Custom Styling</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-brand-primary/3 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}

export default FormDefaultScreen;
