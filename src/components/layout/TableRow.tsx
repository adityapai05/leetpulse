import clsx from "clsx";

type Props = {
  rank: number;
  username: string;
  xp: number;
  avgIteration: number;
};

export default function TableRow(props: Props) {
  const { rank, username, xp, avgIteration } = props;
  let bgColor: string;

  if (rank % 2 == 0) {
    bgColor = "bg-bg2";
  } else {
    bgColor = "bg-bg1";
  }

  return (
    <div className={clsx(bgColor, "flex flex-row w-full justify-between")}>
      <div className="flex justify-center items-center w-[10%]">{rank}</div>
      <div className="flex justify-center items-center">{username}</div>
      <div className="flex justify-center items-center w-[20%]">{xp}</div>
      <div className="flex justify-center items-center w-[10%]">
        {avgIteration}
      </div>
    </div>
  );
}
