import Phases from "@/components/ui/Phases";

export default function QuestionInfo({
  problem,
  globalProblems,
}: {
  problem: any;
  globalProblems?: any;
}) {
  return (
    <>
      <div className="bg-bg1 flex flex-1 flex-col border-2 border-border rounded-md">
        <div className="bg-bg2 py-2 px-6">Problem Statement</div>
        <div className="flex flex-col gap-8 mx-6 my-4">
          <div className="flex flex-row text-xl font-semibold">
            <span className="text-text_primary">
              {problem.problemNo}.&nbsp;
            </span>
            <span className="text-text_primary">{problem.problemName}</span>
          </div>
          {/* Problem Statement */}
          <div className="flex flex-col">
            <span className="text-text_primary text-base">
              {globalProblems.problemStatement}
            </span>
          </div>
          {/* Notes */}
          <div className="flex flex-row items-center gap-2">
            <span className="text-text_muted text-sm">Notes:</span>
            <span className="text-text_primary">
              {problem.notes ? problem.notes : "No notes"}
            </span>
          </div>
          {/* Tags */}
          <div className="flex flex-row gap-4 items-center">
            <span className="text-text_muted text-sm">Tags:</span>
            {problem.tags.length != 0 ? (
              problem.tags.map((p: string) => <Phases key={p} variant={p} />)
            ) : (
              <span className="text-text_muted">No tags</span>
            )}
          </div>
          {/* Iteration */}
          <div className="flex flex-row items-center gap-2">
            <span className="text-text_muted text-sm">Iteration:&nbsp;</span>
            <span className="text-text_primary">{problem.iteration}</span>
          </div>
          {/* Phase */}
          <div className="flex flex-row gap-2 items-center">
            <span className="text-text_muted text-sm">Phase:</span>
            <span className="text-text_primary">
              <Phases variant={problem.phase} />
            </span>
          </div>
          {/* Due Date */}
          <div className="flex flex-row items-center gap-2">
            <span className="text-text_muted text-sm">Due date:&nbsp;</span>
            <span className="text-text_primary">
              {new Date(problem.dueDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
