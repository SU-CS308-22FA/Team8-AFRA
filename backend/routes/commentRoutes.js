import express from "express";
import {
  getCommentById,
  getComments,
  CreateComment,
  DeleteComment,
  UpdateComment,
  LikeState,
  getCommentsByLike,
  getCommentsByDate,
  getCommentsByLikeReverse,
  getCommentsBySearchWord,
  getCommentsBySearchUser,
  getFilteredComments,
} from "../controllers/commentController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getComments); // protect,
router.route("/SortedByLike").get(getCommentsByLike);
router.route("/SortedByLikeReverse").get(getCommentsByLikeReverse);
router.route("/SortedByDate").get(getCommentsByDate);
router.route("/ListByWord/:word").get(getCommentsBySearchWord);
router.route("/ListByUser/:username").get(getCommentsBySearchUser);
router.route("/FilterComments").post(getFilteredComments);
router
  .route("/:id")
  .get(getCommentById)
  .delete(protect, DeleteComment)
  .put(protect, UpdateComment);
router.route("/create").post(protect, CreateComment);
router.route("/likes/:id").put(protect, LikeState);

export default router;
