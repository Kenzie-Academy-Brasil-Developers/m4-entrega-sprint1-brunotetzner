import { Router } from "express";

import {
  createUserController,
  listAllUsersController,
  loginUserController,
  updateUserController,
  deleteUserController,
  getUserProfileController,
} from "../controllers/user.controller";

import { verifyTokenMiddleware } from "../middlewares/verifyToken.middleware";
import { verifyIfAdminMiddleware } from "../middlewares/verifyIfAdmin.middleware";
const router = Router();

router.post("", createUserController);
router.post("/login", loginUserController);
router.get(
  "",
  verifyTokenMiddleware,
  verifyIfAdminMiddleware,
  listAllUsersController
);
router.patch("/:id", verifyTokenMiddleware, updateUserController);
router.delete("/:id", verifyTokenMiddleware, deleteUserController);
router.get("/profile", verifyTokenMiddleware, getUserProfileController);

export default router;
