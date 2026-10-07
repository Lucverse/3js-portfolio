import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISocialLink {
  title: string;
  url: string;
  imageUrl: string;
  alt?: string;
}

export interface IPortfolioConfig extends Document {
  configId: string;
  name: string;
  birthYear: number;
  email: string;
  phone: string;
  title: string[];
  address: {
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  siteMetadata: {
    siteUrl: string;
    siteName: string;
    title: string;
    description: string;
    ogDescription: string;
    ogImage: string;
    favicon: string;
    themeColor: string;
  };
  socialLinks?: ISocialLink[];
}

const PortfolioConfigSchema = new Schema<IPortfolioConfig>(
  {
    configId: { type: String, required: true, unique: true, default: "main" },
    name: { type: String, required: true },
    birthYear: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    title: [{ type: String, required: true }],
    address: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, required: true },
    },
    siteMetadata: {
      siteUrl: { type: String, required: true },
      siteName: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      ogDescription: { type: String, required: true },
      ogImage: { type: String, required: true },
      favicon: { type: String, required: true },
      themeColor: { type: String, required: true },
    },
    socialLinks: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
        imageUrl: { type: String, required: true },
        alt: { type: String },
      },
    ],
  },
  { timestamps: true },
);

const PortfolioConfig: Model<IPortfolioConfig> =
  mongoose.models.PortfolioConfig ||
  mongoose.model<IPortfolioConfig>("PortfolioConfig", PortfolioConfigSchema);

export default PortfolioConfig;
