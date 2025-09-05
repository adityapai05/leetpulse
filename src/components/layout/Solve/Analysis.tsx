import Correct from "@/components/layout/Solve/Correct";
import Incorrect from "@/components/layout/Solve/Incorrect";
import QuestionInfo from "./QuestionInfo";
import { useEffect, useState } from "react";

type Props = {
  analysis: analysisData;
};

type analysisData = {
  verdict: string;
  insights?: string;
  usersComplexity?: {
    time: string;
    space: string;
  };
  bestComplexity?: {
    time: string;
    space: string;
  };
  optimizations?: string;
  failureReasons?: string;
  correctionHints?: string;
  correctCode?: string;
  dueDate: string;
  recommendedProblems: string;
};

export default function Analysis(props: Props) {
  const [verdict, setVerdict] = useState("Correct");
  const analysis = props.analysis;

  useEffect(() => {
    setVerdict(analysis.verdict);
  }, [analysis.verdict]);

  return (
    <>
      <div className="bg-bg1 flex flex-1 flex-col justify-between p-4 border-2 border-bg2 rounded-xl shadow-md h-full w-1/2">
        {verdict === "Correct" ? (
          <Correct analysis={analysis} />
        ) : (
          <Incorrect analysis={analysis} />
        )}
      </div>
    </>
  );
}
