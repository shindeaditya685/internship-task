import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema({
  name: {
    type: String,
    required: [true, "Service name is required!"],
  },
  description: {
    type: String,
    required: [true, "Service description is required!"],
  },
  price: {
    type: Number,
    required: [true, "Service price is required!"],
  },
});

export const Service = mongoose.model("Service", serviceSchema);
