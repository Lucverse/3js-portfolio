import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  role?: string;
  duration?: string;
  tags?: string[];
  description: string;
  techStack: {
    name: string;
    icon?: string;
  }[];
  detailedDescription?: {
    desc: string;
    keyPoints?: {
      label: string;
      image?: string;
    }[];
  };
  url?: string;
  repo?: string;
  order: number;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    role: { type: String },
    duration: { type: String },
    tags: [{ type: String }],
    description: { type: String, required: true },
    techStack: [
      {
        name: { type: String, required: true },
        icon: { type: String },
      },
    ],
    detailedDescription: {
      desc: { type: String },
      keyPoints: [
        {
          label: { type: String },
          image: { type: String },
        },
      ],
    },
    url: { type: String },
    repo: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
