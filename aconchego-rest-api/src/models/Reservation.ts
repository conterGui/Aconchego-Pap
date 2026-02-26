import mongoose, { Document, Schema } from 'mongoose';

export interface IReservation extends Document {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  peopleQuantity: number;
  reservationDate: Date;
  reservationTime: string;
  eventId?: mongoose.Types.ObjectId;
  tableNumber?: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReservationSchema = new Schema<IReservation>(
  {
    customerName: { type: String, required: true },
    customerEmail: {
  type: String,
  required: true,
  lowercase: true,
  trim: true,
  match: [/^\S+@\S+\.\S+$/, "Email inválido"],
},

    customerPhone: { type: String, required: true },
    peopleQuantity: { type: Number, required: true, min: 1 },
    reservationDate: { type: Date, required: true },
    reservationTime: { type: String, required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "Event" },
    tableNumber: { type: Number },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending'
    },
    notes: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IReservation>('Reservation', ReservationSchema);
