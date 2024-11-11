const express = require("express");
const mongoose = require("mongoose");
const eventRoute = require("./controller/eventRoute");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 4000;

// MongoDB Connection
mongoose.set("strictQuery", true);
const dbURI = "mongodb+srv://lakshmiab84:event@cluster0.lnpid.mongodb.net/lakshmiab?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS Configuration
const allowedOrigins = ["http://localhost:3001"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use('/api', eventRoute);

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
