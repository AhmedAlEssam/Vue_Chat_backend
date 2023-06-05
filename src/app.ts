import express from "express";
import "reflect-metadata";
import database from "./database";
import User from "./entities/user";
import { attachControllers } from "@decorators/express";
import AuthController from "./controllers/authController";
import ConversationController from "./controllers/conversationController";
import cors from "cors";
import { FRONTEND_URL } from './config'; 
const app = express();

app.use(express.json())
const port = 3000; 
 
 app.use( cors({ origin: FRONTEND_URL })); 

const launch = async () => {

    await database.initialize().then(dataSource => {
        console.log(`The database connected successfully`);
    }).catch(error => {
        console.log(error);
    });

    await attachControllers(app, [AuthController, ConversationController]);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })

}

launch();