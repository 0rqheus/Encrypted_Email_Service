const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const app = express();

// const publicRoot = __dirname + "/client/dist";
// app.use(express.static(publicRoot));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => {

        console.log("Mongo database connected");

        app.listen(process.env.PORT, () => 
            console.log(`Server started on port ${process.env.PORT}`)
        );
    })
    .catch(() => console.error("ERROR: Mongo database not connected:\n", process.env.MONGODB_URI));

// app.get("/", (req, res) => {
//     res.sendFile("index.html", { root: publicRoot });
// });

const authRouter = require("./routes/auth")(passport);
app.use("/auth", authRouter);

const apiRoute = require("./routes/api")(passport);
app.use("/api/v1", apiRoute);