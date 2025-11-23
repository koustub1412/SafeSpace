const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// CONNECT DATABASE
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// DEFAULT TEST ROUTE
app.get("/", (req, res) => {
  res.send("SafeSpace Backend Running...");
});

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/sos", require("./routes/sosRoutes"));

// START SERVER
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

// SOCKET.IO SETUP
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("sendSOS", (data) => {
    console.log("SOS Received:", data);
    io.emit("receiveSOS", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
