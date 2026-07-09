import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import serviceRoutes from "./routes/service.routes";
import orderRoutes from "./routes/order.routes";
import messageRoutes from "./routes/message.routes";
import reviewRoutes from "./routes/review.routes";
import chatRoutes from "./routes/chat.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/orders/:orderId/messages", messageRoutes);
app.use("/api/orders/:orderId/review", reviewRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});