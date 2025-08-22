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
  dueDate: { type: Date },
});

// Pre-save hook to set dueDate to tomorrow.
ProblemSchema.pre("save", function (next) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  this.dueDate = tomorrow;
  next();
});

export default mongoose.model("Problem", ProblemSchema);
