import express from 'express';
import env from "dotenv"
env.config()

import config from 'config';
import routes from "./src/startup/routes";
import prisma from './src/startup/db';
import startup from './src/startup/startup';
const app = express();

startup(app)
routes(app)

const server = app.listen(config.get<number>("port") , ()=>{
    console.log(`server start on port ${config.get<number>("port")}`);
})

server.on("close" , async ()=>{
    await prisma.$disconnect()
    process.exit(1)
})
