import mongoose, { Schema } from 'mongoose';

const ChatSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    members: [
      {
        type: [Schema.Types.ObjectId],
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Chat', ChatSchema);
