import mongoose, { mongo } from "mongoose";

const connectDB = async (DATABASE_URL) => {
    try{
        const DB_OPTIONS = {
            dbName: 'logindb'
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log('Connected Successfull...');
    }catch(err){
        console.log(err);
    }
}

export default connectDB;