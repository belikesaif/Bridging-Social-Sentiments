import dbConnect from '../../lib/mongodb';
import mongoose from 'mongoose';

const flipkartSchema = new mongoose.Schema({
  product_title: String,
  Rate: Number,
  Review: String,
  Summary: String,
  flipkart_sentiment_label: String,
  flipkart_sentiment_score: Number,
  flipkart_total_votes: Number,
});

const FlipKartProduct = mongoose.models.FlipKartProduct || mongoose.model('FlipKartProduct', flipkartSchema, 'FlipKart_Products_SA');

export default async function handler(req, res) {
  await dbConnect();

  try {
    const flipkartProducts = await FlipKartProduct.find({}, 'product_title Rate flipkart_total_votes flipkart_sentiment_label')
      .limit(100) // Limit to the first 100 products
      .lean();

    const products = flipkartProducts.map(product => ({
      name: product.product_title,
      rating: product.Rate,
      votes: product.flipkart_total_votes,
      sentiment: product.flipkart_sentiment_label,
    }));

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Flipkart products', error: error.message });
  }
}
