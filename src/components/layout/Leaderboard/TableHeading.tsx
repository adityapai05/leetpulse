type TableHeading = {
  head1: string;
  head2: string;
  head3: string;
};

export default function TableHead(props: TableHeading) {
  const { head1, head2, head3 } = props;

  return (
    <div
      className={
        "flex flex-row w-full justify-between h-12 rounded-md text-sm font-light"
      }
    >
      <div className="flex justify-center items-center w-[10%]">{head1}</div>
      <div className="flex items-center px-4 w-[80%]">{head2}</div>
      <div className="flex justify-center items-center w-[10%]">{head3}</div>
    </div>
  );
}
