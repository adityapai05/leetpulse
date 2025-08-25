import mongoose from "mongoose";

const GlobalProblemSchema = new mongoose.Schema({
  problemNumber: { type: Number, required: true, unique: true },
  problemStatement: { type: String, required: true },
  arguments: { type: [String] },
  returnType: { type: String, required: true },
});

export default mongoose.model("GlobalProblems", GlobalProblemSchema);
