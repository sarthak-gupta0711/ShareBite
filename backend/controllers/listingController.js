const Listing = require('../models/Listing');

// @desc    Add new food listing
// @route   POST /api/listings
const addListing = async (req, res) => {
  try {
    const { food_name, description, freshness, price, city, seller_id } = req.body;

    let picture_url = null;
    if (req.file) {
      picture_url = `uploads/${req.file.filename}`;
    }

    const created_at = new Date();
    // Expiry after 24 hours just like Flask app
    const expiry_at = new Date(created_at.getTime() + 24 * 60 * 60 * 1000);

    const listing = await Listing.create({
      food_name,
      description,
      freshness_duration: freshness,
      price: Number(price),
      city,
      seller_id,
      picture_url,
      created_at,
      expiry_at
    });

    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all active food listings
// @route   GET /api/listings
const getListings = async (req, res) => {
  try {
    const now = new Date();
    
    // First, let's delete expired listings to match Flask logic
    await Listing.deleteMany({ expiry_at: { $lte: now } });

    // Then fetch active ones
    const listings = await Listing.find({ expiry_at: { $gt: now } }).populate('seller_id', 'name phone');

    // Add expires_in field
    const formattedListings = listings.map(listing => {
        const item = listing.toObject();
        const diff = new Date(item.expiry_at) - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        if (hours >= 1) {
            item.expires_in = `${hours}h ${minutes}m`;
        } else {
            item.expires_in = `${minutes}m`;
        }
        return item;
    });

    res.json(formattedListings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addListing,
  getListings
};
