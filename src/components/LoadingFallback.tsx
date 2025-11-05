function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="sr-only">Caricamento...</span>
        </div>
        <p className="mt-4 text-gray-600">Caricamento...</p>
      </div>
    </div>
  );
}

export default LoadingFallback;
