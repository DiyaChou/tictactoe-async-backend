const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/user.route");
const gameRouter = require("./routes/game.route");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("error connecting DB"));

app.use("/user", userRouter);
app.use("/game", gameRouter);

app.listen(PORT, () => {
  console.log(`connected to http://localhost:${PORT}`);
});
