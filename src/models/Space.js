const SpaceSchema = new mongoose.Schema({
  title: String,
  description: String,
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  editors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

const Space = mongoose?.models?.Space || mongoose.model("Space", SpaceSchema);
