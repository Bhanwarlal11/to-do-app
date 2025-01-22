const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const statsRoutes = require("./routes/statsRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  "https://to-do-app-2-3pfb.onrender.com",
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/stats", statsRoutes);

app.get("/", (req, res) => {
  res.send("welcome to To-do list app");
});

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
