const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email_address: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    shipping_address: {
      type: String,
      required: true,
    },
    selling_address: {
      type: String,
      required: function() { return this.user_type === 'seller'; }, // Only for sellers
    },
    user_type: {
      type: String,
      required: true,
      enum: ['consumer', 'seller'],
    },
  },
  {
    timestamps: true,
  }
);

// We'll use this model for the 'users' collection to match the previous structure
module.exports = mongoose.model('User', userSchema, 'users');
