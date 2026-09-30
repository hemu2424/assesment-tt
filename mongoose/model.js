import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },

    category: {
      type: String,
      required: true,
      enum: ["Beginner", "Advanced", "Wellness"],
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


planSchema.index({ category: 1, price: -1 });

const Plan = mongoose.model("Plan", planSchema);

export default Plan;