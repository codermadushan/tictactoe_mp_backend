import "dotenv/config";
import mongoose from "mongoose";

import server from "./app.js";

try {
  await mongoose.connect(process.env.DBURL);
  console.log("MongoDB connection success");
} catch (error) {
  console.log("MongoDB connection failure");
  process.exit(1);
}

const port = process.env.PORT || 8000;
server.listen(port, "127.0.0.1", () => {
  console.log(`Server running on port: ${port}`);
});
