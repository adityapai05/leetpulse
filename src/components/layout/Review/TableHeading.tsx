type TableHeading = {
  head1: string;
  head2: string;
  head3: string;
  head4: string;
  head5: string;
  head6: string;
};

export default function TableHead({
  head1,
  head2,
  head3,
  head4,
  head5,
  head6,
}: TableHeading) {
  return (
    <div className="grid grid-cols-[1fr_10fr_1fr_2fr_2fr_2fr] h-12 rounded-t-md text-sm font-light">
      <div className="flex justify-center items-center">{head1}</div>
      <div className="flex items-center px-4">{head2}</div>
      <div className="flex justify-center items-center">{head3}</div>
      <div className="flex justify-center items-center">{head4}</div>
      <div className="flex justify-center items-center">{head5}</div>
      <div className="flex justify-center items-center">{head6}</div>
    </div>
  );
}
