import KeyValueDisplay from "@/components/ui/KeyValueDisplay";
import Correct from "@/components/layout/Solve/Correct";
import Incorrect from "@/components/layout/Solve/Incorrect";
import { useEffect, useState } from "react";

export default function Ananlysis() {
  const [verdict, setVerdict] = useState("Correct");

  return (
    <>
      <div className="bg-bg1 flex flex-1 flex-col justify-between p-4 border border-accent rounded-md shadow-md h-full">
        {verdict === "Correct" ? <Correct /> : <Incorrect />}
      </div>
    </>
  );
}
