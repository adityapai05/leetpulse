import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  problemNo: { type: String, required: true },
  problemName: { type: String, required: true },
  slug: { type: String, required: true },
  iteration: { type: Number, default: 0 },
  phase: {
    type: String,
    enum: ["learning", "stable", "struggling"],
    default: "learning",
  },
  retention: { type: Number, default: 0 },
  tags: { type: [String], default: "" },
  notes: { type: String, default: "" },
  dueDate: {
    type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
});

export default mongoose.model("Problem", ProblemSchema);
