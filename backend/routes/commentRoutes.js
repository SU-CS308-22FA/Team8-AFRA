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
  getCommentsByReferee,
  getCommentsByJournalist,
  getCommentsByUser,
  getCommentsLikeFive,
  getCommentsLikeTen,
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
router.route("/FilteredByReferee").get(getCommentsByReferee);
router.route("/FilteredByJournalist").get(getCommentsByJournalist);
router.route("/FilteredByUser").get(getCommentsByUser);
router.route("/FilteredByLikeFive").get(getCommentsLikeFive);
router.route("/FilteredByLikeTen").get(getCommentsLikeTen);
router
  .route("/:id")
  .get(getCommentById)
  .delete(protect, DeleteComment)
  .put(protect, UpdateComment);
router.route("/create").post(protect, CreateComment);
router.route("/likes/:id").put(protect, LikeState);

export default router;
