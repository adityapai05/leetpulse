import mongoose, { Model } from "mongoose";

export interface IGlobalProblem {
  slug: string;
  problemStatement: string;
  inputArguments: string;
  outputDataType: string;
}

const GlobalProblemSchema = new mongoose.Schema<IGlobalProblem>({
  slug: { type: String, required: true, unique: true },
  problemStatement: { type: String, required: true },
  inputArguments: { type: String, required: true },
  outputDataType: { type: String, required: true },
});

const GlobalProblems: Model<IGlobalProblem> =
  (mongoose.models.GlobalProblems as Model<IGlobalProblem>) ||
  mongoose.model<IGlobalProblem>("GlobalProblems", GlobalProblemSchema);

export default GlobalProblems;