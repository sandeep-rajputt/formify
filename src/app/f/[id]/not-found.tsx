import Link from "next/link";
export default function FormNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-light-fg dark:text-dark-fg mb-4">
          Form Not Found
        </h1>
        <p className="text-light-fg-muted dark:text-dark-fg-muted mb-6">
          The form you&apos;re looking for doesn&apos;t exist or is no longer
          available.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
