import { Schema, models, model } from "mongoose";
const CarSchema = Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  fuelType: {
    type: String,
    enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
    required: true,
  },
  transmission: {
    type: String,
    enum: ["Manual", "Automatic"],
    required: true,
  },
  seats: {
    type: String,
    required: true,
  },
  AC: {
    type: String,
    default: true,
  },

  images: {
    type: [String],
    default: []
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Car = models.Car || model("Car", CarSchema);
