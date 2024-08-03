import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  salt: String,
  accounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
  ],
  email: String,
  spaces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
    },
  ],
  role: {
    type: String,
    default: "user",
  },

  lastModifiedAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

const User = mongoose?.models?.User || mongoose.model("User", UserSchema);

export default User;
