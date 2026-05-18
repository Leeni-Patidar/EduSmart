import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async()=>{
    try {
        await mongoose.connect(ENV.MONGO_URI)
        console.log("Database connected")
        
        // Drop old unique index on stripeSessionId if it exists
        try {
            const ordersCollection = mongoose.connection.collection('orders');
            await ordersCollection.dropIndex('stripeSessionId_1');
            console.log('Dropped old stripeSessionId_1 index');
        } catch (indexError) {
            // Index might not exist, which is okay
            if (!indexError.message.includes('index not found')) {
                console.log('Index cleanup:', indexError.message);
            }
        }
    } catch (error) {
        console.log(`error from connectDB ,${error}`)
    }
}