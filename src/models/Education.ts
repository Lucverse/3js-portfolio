import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEducation extends Document {
  title: string;
  date: string;
  institution: string;
  description: string;
  order: number;
}

const EducationSchema = new Schema<IEducation>(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    institution: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Education: Model<IEducation> =
  mongoose.models.Education ||
  mongoose.model<IEducation>("Education", EducationSchema);

export default Education;
