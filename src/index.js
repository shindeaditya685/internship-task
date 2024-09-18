import dotenv from "dotenv";
import connectBD from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT;

connectBD()
  .then(() => {
    app.on("error", (error) => {
      console.log(`Error while creating app ${error}`);
    });
    app.listen(port || 4000, () => {
      console.log(`Server is running at port : ${port}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB connection failed!!!  ", error);
  });
