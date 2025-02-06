import { Schema, model } from 'mongoose';

const costSchema = new Schema(
  {
    description: { type: String, required: true },
    category: { type: String, required: true },
    userid: { type: String, required: true },
    sum: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export const Cost = model('Cost', costSchema);
