import express, {Errback, NextFunction, Request,Response,Application} from 'express';
const cors = require("cors");
const bodyParser = require("body-parser");
const todoRoutes = require('./routes/todo');
const userRoute = require('./routes/user');



const app:Application = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const uri = "mongodb+srv://mongo-db.4wnckrr.mongodb.net";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    dbName: 'todos_db',
    user: 'ruth',
    pass: 'ruth',
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO DATABASE");
  }).catch(err => console.error("could not connect to db", err));


app.get("/", (req:Request, res:Response):void => {
    res.send("Home page of todo list")
});

app.use(cors());
app.use(bodyParser.json());

app.use("/api", todoRoutes);
app.use('/api', userRoute);
app.use(function (err: any, _req:Request, res:Response, _next:NextFunction) {
        return res.status(404).json({
            message: err,
        });
});
app.get("*", (req:Request, res:Response) => {
  res.send("Invalid path");
});


app.listen(PORT, ():void => {
    console.log(`Server Running here  https://localhost:${PORT}`);
});
