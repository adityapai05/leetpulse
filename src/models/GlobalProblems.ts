import mongoose from "mongoose";

const GlobalProblemSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  problemStatement: { type: String, required: true },
  inputArguments: { type: String, required: true },
  outputDataType: { type: String, required: true },
});

export default mongoose.models.GlobalProblems ||
  mongoose.model("GlobalProblems", GlobalProblemSchema);