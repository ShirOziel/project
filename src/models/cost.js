import { Schema, model } from 'mongoose';

const costSchema = new Schema(
  {
    description: { type: String, required: true },
    category: { 
      type: String, 
      required: true, 
      enum: ['food', 'health', 'housing', 'sport', 'education'], 
      message: 'Invalid category'
    },
    userid: { type: String, required: true },
    sum: { type: Number, required: true, min: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Cost = model('Cost', costSchema);
