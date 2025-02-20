import express from 'express';
import { adminLogin, adminLogout, allChats, allMessages, allUser, getAdminData, getDashboardStats } from '../controllers/admin.js';

import { adminLoginValidator, validateHandler } from "../lib/validators.js";
import { adminOnly } from '../middlewares/auth.js';
const app = express.Router();



app.post("/verify",adminLoginValidator(),validateHandler,adminLogin);

app.get("/logout",adminLogout);

//Only Admin can access this routes
app.use(adminOnly);

app.get("/",getAdminData);


app.get("/users", allUser);

app.get("/chats", allChats);

app.get("/messages",allMessages);

app.get("/stats", getDashboardStats);



export default app;