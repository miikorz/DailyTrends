import mongoose, { Schema } from 'mongoose';

const FeedSchema = new Schema({
  title: String,
  subtitle: {
    type: String,
    default: null,
    required: false,
  },
  description: String,
  author: String,
  link: String,
  portrait: {
    type: String,
    default: null,
    required: false,
  },
  newsletter: String,
});

export const FeedODMModel = mongoose.model('Feed', FeedSchema);