import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema(
  {
    ProId: { type: String, required: true },
    ProName: { type: String, required: true },
    ProImg: { type: String }, // will store image path
    Price: { type: Number, required: true },
    Amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);


export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);