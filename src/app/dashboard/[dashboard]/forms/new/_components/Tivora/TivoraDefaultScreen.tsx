import React from "react";
import { PiMagicWand } from "react-icons/pi";

const quickStartOptions = [
  {
    name: "Create a contact form",
    description: "Collect contact information from your users.",
  },
  {
    name: "Create a feedback form",
    description: "Gather feedback from your users.",
  },
  {
    name: "Create a survey",
    description: "Conduct a survey to collect data.",
  },
  {
    name: "Create a registration form",
    description: "Allow users to register for an event or service.",
  },
];

function TivoraDefaultScreen() {
  return (
    <div className="my-5 px-2 flex flex-col gap-2">
      <div className="flex gap-2 items-center text-lg font-semibold">
        <PiMagicWand className="text-brand-primary" />
        <h5>Quick Start</h5>
      </div>
      <div>
        {quickStartOptions.map((option, index) => (
          <button
            key={index}
            className="my-1 w-full text-start px-2 py-2 border rounded-md border-light-fg/10 dark:border-dark-fg/10 cursor-pointer hover:bg-light-surface-alt dark:hover:bg-dark-surface transition-colors duration-200"
          >
            <h6 className="text-sm font-medium">{option.name}</h6>
            <p className="text-xs text-light-fg-muted dark:text-dark-fg-muted">
              {option.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TivoraDefaultScreen;
