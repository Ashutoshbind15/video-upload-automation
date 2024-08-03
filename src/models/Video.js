import mongoose from "mongoose";

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
      providerUrl: {
        type: String,
      },
      approved: {
        type: Number,
        default: 0,
      },
      cloudUploadProgress: {
        type: Number,
        default: 0, // 0 - 100%
      },
      providerUploadProgress: {
        type: Number,
        default: 0, // 0 - 100%
      },
      chats: [
        {
          sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          text: String,
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      metadata: mongoose.Schema.Types.Mixed, // For Platform object metadata
    },
  ],
});

const Video = mongoose?.models?.Video || mongoose.model("Video", videoSchema);

export default Video;
