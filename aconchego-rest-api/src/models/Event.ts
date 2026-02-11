import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  eventDate: Date;
  eventTime: string;

  image?: string;
  location?: string;

  artist: string;
  price: number;
  venue: string;

  category: "jazz" | "workshop" | "degustacao" | "especial";
  featured?: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    eventDate: { type: Date, required: true },
    eventTime: { type: String, required: true },

    image: { type: String },
    location: { type: String },

    artist: { type: String, required: true },
    price: { type: Number, required: true },
    venue: { type: String, required: true },

    category: {
      type: String,
      enum: ["jazz", "workshop", "degustacao", "especial"],
      required: true,
    },

    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IEvent>("Event", EventSchema);
