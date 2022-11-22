
import express from "express";
import {
  getCommentById,
  getComments,
  CreateComment,
  DeleteComment,
  UpdateComment,
  LikeState,

} from "../controllers/commentController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getComments); // protect,
router
  .route("/:id")
  .get(getCommentById)
  .delete(protect, DeleteComment)
  .put(protect, UpdateComment);
router.route("/create").post(protect,CreateComment);
router.route("/likes/:id").put(protect,LikeState);





export default router;