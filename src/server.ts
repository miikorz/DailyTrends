import app from "./app";
import { connectDB } from "./infrastructure/database/connect";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
