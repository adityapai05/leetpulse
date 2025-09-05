import Phases from "@/components/ui/Phases";

export default function QuestionInfo({
  problem,
  globalProblems,
}: {
  problem: any;
  globalProblems?: any;
}) {
  return (
    <div className="bg-bg1 flex flex-1 flex-col gap-6 px-8 py-4 border-2 border-bg2 rounded-md shadow-md">
      {/* Question */}
      <div className="flex flex-row text-2xl font-semibold">
        <span className="text-text_primary">{problem.problemNo}.&nbsp;</span>
        <span className="text-text_primary">{problem.problemName}</span>
      </div>
      {/* Problem Statement */}
      <div className="flex flex-col">
        <span className="text-text_muted">Problem Statement</span>
        <span className="text-text_primary">
          {globalProblems.problemStatement}
        </span>
      </div>
      {/* Notes */}
      <div className="flex flex-col ">
        <span className="text-text_muted">Notes:</span>
        <span className="text-text_primary">{problem.notes}</span>
      </div>
      {/* Tags */}
      <div className="flex flex-row gap-4">
        <span className="text-text_muted">Tags:</span>
        {problem?.tags?.length ? (
          problem.tags.map((p: string) => <Phases key={p} variant={p} />)
        ) : (
          <span className="text-text_muted">No tags</span>
        )}
      </div>
      {/* Iteration */}
      <div className="flex flex-row">
        <span className="text-text_muted">Iteration:&nbsp;</span>
        <span className="text-text_primary">{problem.iteration}</span>
      </div>
      {/* Phase */}
      <div className="flex flex-row gap-4">
        <span className="text-text_muted">Phase:</span>
        <span className="text-text_primary">
          <Phases variant={problem.phase} />
        </span>
      </div>
      {/* Due Date */}
      <div className="flex flex-row">
        <span className="text-text_muted ">Due date:&nbsp;</span>
        <span className="text-text_primary">
          {new Date(problem.dueDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}
