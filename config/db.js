const mongoose = require("mongoose");

//function mongodb database connection
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected To Database", mongoose.connect.name)
    } catch (error) {
        console.log("DB Error", error)
    }
};
module.exports = connectDb;