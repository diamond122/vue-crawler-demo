import mongoose from 'mongoose';
 
import Site from './site.js';
 
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};
 
const models = { Site };
 
export { connectDb };
 
export default models;