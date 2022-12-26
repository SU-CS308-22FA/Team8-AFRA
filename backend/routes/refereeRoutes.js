import express from "express";

import {
  getAllReferees,
  getRefereeNameSorted,
  getRefereeRankSorted,
  getRefereeMatchCountSorted,
  putNewRankForReferee,
} from "../controllers/refereeController.js";

const router = express.Router();

router.route("/").get(getAllReferees);
router.route("/sortbyname").get(getRefereeNameSorted);
router.route("/sortbyrank").get(getRefereeRankSorted);
router.route("/sortbymatchcount").get(getRefereeMatchCountSorted);
router.route("/updaterankofreferee").post(putNewRankForReferee);
export default router;
