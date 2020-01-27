import mongoose, { Schema } from 'mongoose';

export interface UserInterface extends mongoose.Document {
  name?: string;
  secretHash: string;
  createdAt: Date;
  modifiedAt: Date;
}

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
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<UserInterface>('User', UserSchema);
