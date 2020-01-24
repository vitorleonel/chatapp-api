import mongoose, { Schema } from 'mongoose';

const MessageSchema: Schema = new Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Message', MessageSchema);
