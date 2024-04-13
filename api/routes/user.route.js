import express from "express";
import { test, updateUser, deleteUser } from "../controllers/user.controllers.js";//.js should be here. By default it doesn't come
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
 export default router;