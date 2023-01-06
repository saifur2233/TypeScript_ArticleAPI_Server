import mongoose, { Document, Schema } from "mongoose";

export interface IBlog {
  title: string;
  email: string;
  description: string;
}

export interface IBlogModel extends IBlog, Document {}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IBlogModel>("Blog", BlogSchema);
