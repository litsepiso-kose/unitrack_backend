import "reflect-metadata";
import "./initialize/index.js";
import "./initializeApollo.js";
import "./intializeSocket.js";
import "./initializeCron.js";
 
console.log(process.env.MONGO_URI)