const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/profile", require("./routes/profile"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/jobs", require("./routes/jobs"));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ Mongo error", err));

// Routes
app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("🚀 Server is running");
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server started on port ${process.env.PORT}`)
);
