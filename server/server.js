import dotenv from "dotenv";
import express from "express";
import path from "path";

import orderRoutes from "./routes/orders.js";
import paypalRoutes from "./routes/paypal.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/paypal", paypalRoutes);
app.use("/orders", orderRoutes);

app.use(express.static(path.join(process.cwd(), "dist")));


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})
