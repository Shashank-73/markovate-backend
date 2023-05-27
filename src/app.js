import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { createToken, verifyToken } from "./user.js";
import { User } from "./models/user.model.js";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://shashank220076:UTbAspTlqiMcdyFX@cluster0.vuoqvvi.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: "markovate" }
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));


app.post("/signup", async (req, res) => {
  const {
    firstName = "",
    lastName = "",
    companyName = "",
    email = "",
    contactNo = "",
    contactNoOptional = "",
    companySize = "",
    companyRevenue = "",
    password = "",
    sendEmails = false,
    privacyPolicy = false,
  } = req.body;

  try {
    const token = createToken({ email, password });
    await User.create({
      name: firstName + lastName,
      email,
      companyName,
      contactNo,
      contactNoOptional,
      companySize,
      companyRevenue,
      sendEmails,
      privacyPolicy,
      interest: "Engineering",
    });
    return res.send({ accessToken: token });
  } catch (err) {
    return res.send(err);
  }
});

app.get("/user", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const user = verifyToken(token);
    if (user) {
      const userData = await User.findOne({ email: user.email });
      return res.send(userData);
    }
  } catch (err) {
    return res.send(err);
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  try {
    const token = createToken({ email, password });
    return res.send({accessToken: token});
  } catch (err) {
    return res.send(err);
  }
});

app.post("/interest", async (req, res) => {
  const token = req.headers.authorization;
  const { interest = "Engineering" } = req.body;
  try {
    const user = verifyToken(token);
    if (user) {
      const userData = await User.findOneAndUpdate(
        { email: user.email },
        { interest }
      );
      return res.send(userData);
    }
  } catch (err) {
    return res.send(err);
  }
});

app.listen(4000, () => {
  console.log("port litening on ", 4000);
});
