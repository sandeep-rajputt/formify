"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center my-auto justify-center min-h-full p-6">
      <div className="max-w-2xl w-full text-center space-y-8 flex flex-col items-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-500">
            Something went wrong!
          </h1>
        </div>
        <button
          onClick={() => reset()}
          className="px-8 py-3 text-lg cursor-pointer font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-fit"
        >
          Retry
        </button>
        <p className="text-gray-500 dark:text-gray-400">
          If retrying doesn&apos;t help, please try reloading the page.
        </p>
      </div>
    </div>
  );
}
