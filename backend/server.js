const app = require ("./app");
const dotenv= require('dotenv');
const connectDatabase = require("./config/database");

//handling uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.mesaage}`);
    console.log(`Shutting down the server due to uncaught exception rejection`);

    process.exit(1);
})

//config
dotenv.config({path:"backend/config/config.env"});

// connecting to data base
connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(` Server is working on http://localhost:${process.env.PORT}`)
})



//unhandled promise rejection
process.on("unhandledRejection",err =>{
    console.log(`Error: ${err.mesaage}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(()=>{
        process.exit(1);
    })
});