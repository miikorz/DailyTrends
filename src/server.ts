import app from "./app";
import { connectDB } from "./infrastructure/database/connect";

// TODO: use environment variable
const PORT = 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
