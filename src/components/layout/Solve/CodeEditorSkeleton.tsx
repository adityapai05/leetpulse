export default function CodeEditorSkeleton() {
  return (
    <div className="bg-bg1 flex flex-col flex-1 border-2 border-bg2 rounded-md h-full">
      {/* Header */}
      <div className="bg-bg2 flex justify-between items-center px-4 py-2 rounded-t-md mb-4">
        <div className="h-5 w-8 bg-bg1 rounded animate-pulse"></div>
        <div className="h-6 w-24 bg-bg1 rounded animate-pulse"></div>
      </div>

      {/* Code editor area */}
      <div className="flex-1 mx-4 mb-4 bg-bg2 rounded-md animate-pulse"></div>

      {/* Footer buttons */}
      <div className="bg-bg1 flex flex-row p-4 justify-end gap-4 rounded-b-md">
        <div className="h-10 w-32 bg-bg2 rounded-md animate-pulse"></div>
        <div className="h-10 w-20 bg-bg2 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
}
