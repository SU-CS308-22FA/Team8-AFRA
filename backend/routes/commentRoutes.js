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
  createReplyToComment,
  getReplies,
} from "../controllers/commentController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(getComments); // protect,
router.route("/create/:matchId").post(protect, CreateComment);
router.route("/likes/:id").put(protect, LikeState);
router.route("/getreplies").post(getReplies);
router.route("/reply").post(createReplyToComment);
router.route("/SortedByLike").post(getCommentsByLike);
router.route("/SortedByLikeReverse").post(getCommentsByLikeReverse);
router.route("/SortedByDate").post(getCommentsByDate);
router.route("/ListByWord/:word").post(getCommentsBySearchWord);
router.route("/ListByUser/:username").post(getCommentsBySearchUser);
router.route("/FilterComments").post(getFilteredComments);
router
  .route("/:id")
  .post(getCommentById)
  .delete(protect, DeleteComment)
  .put(protect, UpdateComment);


export default router;
