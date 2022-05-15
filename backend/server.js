import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import exercisesRouter from "./routes/exercises.js";
import usersRouter from "./routes/users.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const ATLASURI = process.env.ATLAS_URI;
mongoose.connect(ATLASURI);
//following line doens't work
// reference: https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
// mongoose.connect(URI, {
//     useNewUrlParser: true,
//     useCreateIndex: true
// });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})