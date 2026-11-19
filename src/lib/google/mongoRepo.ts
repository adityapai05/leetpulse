import getUserModel, { type IUser } from "@/models/Users";
import type { AccountUser, UserRepo } from "./account";

function toAccount(doc: IUser): AccountUser {
  return {
    id: String(doc._id),
    googleId: doc.googleId ?? null,
    isVerified: doc.isVerified,
  };
}

export function createMongoUserRepo(): UserRepo {
  const User = getUserModel();

  return {
    async findByGoogleId(googleId) {
      const doc = await User.findOne({ googleId });
      return doc ? toAccount(doc) : null;
    },

    async findByEmail(email) {
      const doc = await User.findOne({ email });
      return doc ? toAccount(doc) : null;
    },

    async isUsernameTaken(username) {
      return (await User.exists({ username })) !== null;
    },

    async create(data) {
      const doc = await User.create({ ...data, isVerified: true });
      return toAccount(doc);
    },

    async linkGoogleId(userId, googleId, clearPassword) {
      const update: Record<string, Record<string, unknown>> = {
        $set: { googleId, isVerified: true },
      };
      if (clearPassword) update.$unset = { password: "" };

      const doc = await User.findByIdAndUpdate(userId, update, { new: true });
      if (!doc) throw new Error("User not found while linking Google account");
      return toAccount(doc);
    },
  };
}
