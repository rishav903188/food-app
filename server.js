const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require('dotenv');
const connectDb = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");



//dotenv config
dotenv.config();

//connection
connectDb()

//rest object
const app = express()

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(errorHandler);


//route
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/auth', require("./routes/authRoutes"));
app.get('/', (req, res) => {
    return res.status(200).send("<h1>welcome to food server</h1>");
});

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});