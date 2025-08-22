import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, unique: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  maxStreak: { type: Number, default: 0 },
  daysActive: { type: Number, default: 1 },
  submissions: { type: Number, default: 0 },
  memoryRetention: { type: Number, default: 0 },
  problemsAdded: { type: Number, default: 0 },
  averageIteration: { type: Number, default: 0 },
  problemsMastered: { type: Number, default: 0 },
});

export default mongoose.model("User", UserSchema);
