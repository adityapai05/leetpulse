export default function Leaderboard() {
  return (
    <div className="bg-bg2 flex flex-col gap-8 mx-16 my-8 p-4 rounded-md shadow-md">
      <div className="flex flex-row gap-2 items-center">
        <span className="text-2xl font-bold">Leaderboard Ranking</span>
        <span className="text-sm text-text_muted">
          (based on XP and iteration)
        </span>
      </div>
      {/* Table below */}
      <div className="border"></div>
    </div>
  );
}
