import mongoose from 'mongoose';

const siteSchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    h1: {
      type: Array,
    },
    h2: {
      type: Array,
    },
    a: {
      type: Array,
    },
  },
  { timestamps: true },
);

const Site = mongoose.model('Site', siteSchema);
export default Site;