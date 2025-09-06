"use client";
export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bg0 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-text_primary"></div>
        <p className="text-text_primary text-lg opacity-0 animate-fadeIn">
          Loading...
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}
