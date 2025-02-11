import { connect } from 'mongoose';

/**
 * Establishes a connection to the MongoDB database
 */
const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`); // Log successful connection
  } catch (error) {
    console.error(`Error: ${error.message}`); // Log connection error
  }
};

export default connectDB;
