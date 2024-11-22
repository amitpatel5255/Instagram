import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

// CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only your frontend URL
  credentials: true, // Allow credentials (cookies, HTTP headers, etc.)
};

// Middlewares
app.use(cors(corsOptions)); // Apply CORS with options
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// Your routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

// Serve static files
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Start server
server.listen(PORT, () => {
  connectDB();
  console.log(`Server listening at port ${PORT}`);
});
