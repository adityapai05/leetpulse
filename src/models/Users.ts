import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  // Auth
  username: { type: String, required: true, unique: true, trim: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  isVerified: { type: Boolean, default: false },

  // Meta
  createdAt: { type: Date, default: Date.now },

  // Progress & stats
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  problemsAdded: { type: Number, default: 0 },
  masteryCount: { type: Number, default: 0 },

  // Engagement
  streak: { type: Number, default: 0 },
  maxStreak: { type: Number, default: 0 },
});

export default mongoose.model("User", UserSchema);
