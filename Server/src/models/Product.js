import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
    title: String,

    brand: String,

    model: String,

    price: Number,

    discount: {
        type: Number,
        default: 0,
    },

    processor: String,

    ram: Number,          // GB

    storage: Number,      // GB

    gpu: String,

    display: Number,      // Inches

    battery: Number,      // Wh

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

    condition: {
        type: String,
        enum: [ 
                "New",
                "Like New",
                "Excellent",
                "Good",
                "Fair"
            ],
        default: "New",
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

const Product = mongoose.model("Product", productSchema);

export default Product;