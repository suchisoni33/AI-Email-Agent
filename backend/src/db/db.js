import mongoose from 'mongoose';
import config from '../config/config.js';

function connectDB() {
    mongoose.connect(process.env.MONGODB_URI , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
}

export default connectDB;

// export { connectDB };