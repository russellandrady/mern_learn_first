import express from "express";
import { test } from "../controllers/user.controllers.js";//.js should be here. By default it doesn't come
const router = express.Router();

router.get("/", test);
 export default router;