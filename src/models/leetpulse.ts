import mongoose from "mongoose";

const leetpulseSchema = new mongoose.Schema({
  totalUsers: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  problemsAdded: { type: Number, default: 0 },
  totalSubmissions: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 },
  feedback: { type: [[String]], default: [] },
});

export default mongoose.model("leetpulse", leetpulseSchema);
