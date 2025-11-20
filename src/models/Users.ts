import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  // Auth
  username: string;
  firstName: string;
  email: string;
  password: string;
  isVerified: boolean;

  // Meta
  createdAt: Date;

  // Progress & stats
  xp: number;
  level: number;
  problemsAdded: number;
  masteryCount: number;

  // Engagement
  streak: number;
  maxStreak: number;
}

const UserSchema = new mongoose.Schema<IUser>({
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

// Function to get model safely without OverwriteModelError
export default function getUserModel(): Model<IUser> {
  return (
    (mongoose.models.User as Model<IUser>) ||
    mongoose.model<IUser>("User", UserSchema)
  );
}
