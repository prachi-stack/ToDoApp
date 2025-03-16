import express from "express";
import connectDb from "./config/db.js";
import documentRoutes from "./routes/documentRoutes.js";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

connectDb();

app.use("/api", documentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
