import mongoose from "mongoose";

const GlobalProblemSchema = new mongoose.Schema({
  problemNumber: { type: Number, required: true, unique: true },
  problemStatement: { type: String, required: true },
  input: { type: String, required: true },
  output: { type: String, required: true },
});

export default mongoose.model("GlobalProblems", GlobalProblemSchema);
