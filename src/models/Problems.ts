import mongoose, { Document, Model } from "mongoose";

export interface IProblem extends Document {
  userId: mongoose.Types.ObjectId;
  problemNo: string;
  problemName: string;
  slug: string;
  iteration: number;
  correct: number;
  phase: "learning" | "stable" | "struggling";
  tags: string[];
  notes: string;
  dueDate: Date;
}

const ProblemSchema = new mongoose.Schema<IProblem>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  problemNo: { type: String, required: true },
  problemName: { type: String, required: true },
  slug: { type: String, required: true },
  iteration: { type: Number, default: 0 },
  correct: { type: Number, default: 0 },
  phase: {
    type: String,
    enum: ["learning", "stable", "struggling"],
    default: "learning",
  },
  tags: { type: [String], default: [] },
  notes: { type: String, default: "" },
  dueDate: {
    type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
});

const Problem: Model<IProblem> =
  mongoose.models.Problems ||
  mongoose.model<IProblem>("Problems", ProblemSchema);
export default Problem;
