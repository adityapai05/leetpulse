import clsx from "clsx";

type Props = {
  rank: number;
  username: string;
  xp: number;
};

export default function TableRow(props: Props) {
  const { rank, username, xp } = props;
  let bgColor: string;
  if (rank == 1) {
    bgColor =
      "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-text_contrast font-medium";
  } else if (rank % 2 == 0 && rank != 1) {
    bgColor = "";
  } else {
    bgColor = "bg-bg2";
  }

  return (
    <div
      className={clsx(
        bgColor,
        "flex flex-row w-full justify-between h-11 rounded-md text-sm"
      )}
    >
      <div className="flex justify-center items-center w-[10%] ">{rank}</div>
      <div className="flex items-center px-4 w-[80%]">{username}</div>
      <div className="flex justify-center items-center w-[10%]">{xp}</div>
    </div>
  );
}
