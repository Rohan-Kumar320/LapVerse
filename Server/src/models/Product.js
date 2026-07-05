import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: String,

    brand: String,

    model: String,

    category: {
      type: String,
      enum: [
        "Gaming",
        "Business",
        "Student",
        "Ultrabook",
        "Workstation",
        "2-in-1",
      ],
    },

    price: Number,

    discount: {
      type: Number,
      default: 0,
    },

    processor: String,

    ram: Number, // GB

    storage: Number, // GB

    gpu: String,

    screenSize: Number, // Inches

    battery: Number, // Wh

    description: String,

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],

    averageRating: {
        type: Number,
        default: 0,
    },

    numReviews: {
        type: Number,
        default: 0,
    },

    condition: {
      type: String,
      enum: [
        "New",
        "Like New",
        "Excellent",
        "Good",
        "Fair",
      ],
      default: "New",
    },

    status: {
      type: String,
      enum: ["Available", "Reserved", "Sold"],
      default: "Available",
    },

    stock: {
      type: Number,
      default: 1,
      min: 0,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({
  title: "text",
  brand: "text",
  model: "text",
});

const Product = mongoose.model("Product", productSchema);

export default Product;