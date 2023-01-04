import mongoose from "mongoose";

const uri = process.env.MONGO_URI;
console.log("uri:", uri);

if (!uri) {
  throw new Error("MongoDB Uri not found! Check your env file");
}


let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connect() {
  if (cached.conn) {
    return cached.conn;
  }
  
  if (!cached.promise && uri) {
    cached.promise = mongoose.connect(uri).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached;
}

export default connect;
