const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  space: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Space",
  },
  requests: [
    {
      uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      cloudUrl: {
        type: String,
      },
      approved: {
        type: Boolean,
        default: false,
      },
      uploadProgress: {
        type: Number,
        default: 0, // 0 - 100%
      },
      metadata: mongoose.Schema.Types.Mixed, // For Platform object metadata
    },
  ],
});

const Video = mongoose?.models?.Video || mongoose.model("Video", videoSchema);
