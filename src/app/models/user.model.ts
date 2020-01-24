import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    secretHash: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', UserSchema);
