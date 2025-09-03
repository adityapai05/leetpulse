import StarRating from "@/components/ui/StarRating";

export default function Section2() {
  return (
    <section className="h-1/4 flex flex-row py-4 px-16 gap-4">
      <div className="rounded-md bg-bg1 flex flex-col items-center justify-center flex-1 border-2 border-bg2 p-4">
        <div className="text-text_primary font-bold text-2xl">#1</div>
        <div className="text-text_muted text-sm">Smart Review Scheduling</div>
      </div>
      <div className="rounded-md bg-bg1 flex flex-col items-center justify-center flex-1 border-2 border-bg2 p-4">
        <div className="text-text_primary font-bold text-2xl">#2</div>
        <div className="text-text_muted text-sm">Notes, Tags and Progress</div>
      </div>
      <div className="rounded-md bg-bg1 flex flex-col items-center justify-center flex-1 border-2 border-bg2 p-4">
        <div className="text-text_primary font-bold text-2xl"># 3</div>
        <div className="text-text_muted text-sm">Built-in IDE for practice</div>
      </div>
      <div className="rounded-md bg-bg1 flex flex-col items-center justify-center flex-1 border-2 border-bg2 p-4">
        <StarRating rating={4} />
        <div className="text-text_muted text-sm ">2 ratings</div>
      </div>
    </section>
  );
}
