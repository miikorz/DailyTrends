import mongoose, { Schema } from 'mongoose';

const FeedSchema = new Schema({
  title: String,
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
