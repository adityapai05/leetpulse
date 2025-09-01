import mongoose from "mongoose";

const LeaderboardSchema = new mongoose.Schema({
  rank: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  xp: { type: Number, required: true },
  avgIteration: { type: Number, required: true },
});

export default mongoose.model("Leaderboard", LeaderboardSchema);
