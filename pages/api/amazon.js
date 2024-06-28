// pages/api/amazon.js
import dbConnect from '../../lib/mongodb';
import mongoose from 'mongoose';

const amazonSchema = new mongoose.Schema({
  product_title: String,
  amazon_star_rating: Number,
  amazon_total_votes: Number,
  amazon_sentiment_label: String,
});

const AmazonProduct = mongoose.models.AmazonProduct || mongoose.model('AmazonProduct', amazonSchema, 'Amazon_Products_SA');

export default async function handler(req, res) {
  await dbConnect();

  try {
    const amazonProducts = await AmazonProduct.find({}, 'product_title amazon_star_rating amazon_total_votes amazon_sentiment_label')
      .limit(100) // Limit to the first 100 products
      .lean();

    const products = amazonProducts.map(product => ({
      name: product.product_title,
      rating: product.amazon_star_rating,
      votes: product.amazon_total_votes,
      sentiment: product.amazon_sentiment_label,
    }));

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Amazon products', error: error.message });
  }
}
