import { Schema, model } from "mongoose";

const costSchema = new Schema({
    description: { type: String, required: true },
    category: { type: String, required: true },
    userid: { type: String, required: true }, // Matches the `id` field in User
    sum: { type: Number, required: true, min: 0 }
}, { timestamps: true }); // Adds createdAt & updatedAt fields

export const Cost = model("Cost", costSchema);
