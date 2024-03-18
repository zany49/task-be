import mongoose from "mongoose";
import "dotenv/config";

const connectDb = async () => {
  mongoose
    .connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection Successful to database.");
    })
    .catch((error) => {
      console.log(error);
    });
};

let gfs;

mongoose.connection.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "files",
  });
});



export { connectDb, gfs };
