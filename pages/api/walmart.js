// pages/api/walmart.js
import dbConnect from '../../lib/mongodb';
import mongoose from 'mongoose';

const walmartSchema = new mongoose.Schema({
  product_title: String,
  walmart_star_rating: Number,
  walmart_total_votes: Number,
  walmart_sentiment_label: String,
});

const WalmartProduct = mongoose.models.WalmartProduct || mongoose.model('WalmartProduct', walmartSchema, 'Walmart_Products_SA');

export default async function handler(req, res) {
  await dbConnect();

  try {
    const walmartProducts = await WalmartProduct.find({}, 'product_title walmart_star_rating walmart_total_votes walmart_sentiment_label')
      .limit(100) // Limit to the first 100 products
      .lean();
    const products = walmartProducts.map(product => ({
      name: product.product_title,
      rating: product.walmart_star_rating,
      votes: product.walmart_total_votes,
      sentiment: product.walmart_sentiment_label,
    }));

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Walmart products', error: error.message });
  }
}
