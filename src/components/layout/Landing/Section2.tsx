import StarRating from "@/components/ui/StarRating";

export default function Section2() {
  return (
    <section className="flex flex-col md:flex-row py-4 px-6 md:px-16 gap-4">
      <div className="shadow-md rounded-md bg-bg1 flex flex-col items-center justify-center flex-1 border-2 border-border p-4">
        <div className="text-text_primary font-bold text-2xl">#1</div>
        <div className="text-text_muted text-sm text-center">
          Smart Review Scheduling
        </div>
      </div>
      <div className="shadow-md rounded-md bg-bg1 flex flex-col items-center justify-center flex-1 border-2 border-border p-4">
        <div className="text-text_primary font-bold text-2xl">#2</div>
        <div className="text-text_muted text-sm text-center">
          Notes, Tags and Progress
        </div>
      </div>
      <div className="shadow-md rounded-md bg-bg1 flex flex-col items-center justify-center flex-1 border-2 border-border p-4">
        <div className="text-text_primary font-bold text-2xl">#3</div>
        <div className="text-text_muted text-sm text-center">
          Built-in IDE for practice
        </div>
      </div>
    </section>
  );
}
