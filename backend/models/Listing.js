const mongoose = require('mongoose');

const listingSchema = mongoose.Schema(
  {
    food_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    freshness_duration: {
      type: String, // String like '2 days', matching Flask logic
      required: true,
    },
    picture_url: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      required: true,
    },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    expiry_at: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: false, // Flask app manually controlled created_at
  }
);

module.exports = mongoose.model('Listing', listingSchema, 'listings');
