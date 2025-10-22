import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  image: string
  roast: string
  weight: string
  origin: string
  type: string
  available: boolean
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    roast: { type: String, required: true },
    weight: { type: String, required: true },
    origin: { type: String, required: true },
    type: { type: String, required: true },
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
