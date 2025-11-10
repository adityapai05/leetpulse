export default function Skeleton() {
  const sections = [];
  for (let i = 0; i < 3; i++) {
    sections.push(
      <div key={i} className="flex flex-col m-4 gap-2">
        <div className="h-4 rounded-full w-1/2 bg-bg2 animate-pulse"></div>
        <div className="h-10 rounded-md w-full bg-bg2 animate-pulse"></div>
      </div>
    );
  }
  return (
    <div className="bg-bg1 flex flex-1 flex-col border-2 border-border rounded-md h-full">
      <div className="bg-bg2 py-2 px-6">
        <div className="bg-bg1 p-3 w-1/6 rounded-md animate-pulse"></div>
      </div>
      {sections}
    </div>
  );
}
