import mongoose, { Schema } from 'mongoose';

const FeedSchema = new Schema({
  title: String,
  subtitle: String,
  description: String,
  author: String,
  link: String,
  portrait: String,
  newsletter: String,
});

export const FeedODMModel = mongoose.model('Feed', FeedSchema);
