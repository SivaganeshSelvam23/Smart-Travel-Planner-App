export default function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-screen flex-col items-center justify-center gap-4"
    >
      <div
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600"
      />

      <p className="text-sm text-gray-600">Checking your session...</p>
    </div>
  );
}
