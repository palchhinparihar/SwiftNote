import mongoose from "mongoose";

const mongoURI = "mongodb://localhost:27017/swiftNote";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Database successfully!");
    } catch (error) {
        console.log("Couldn't connect to Database!", error);
    }
}

export default connectToMongo;