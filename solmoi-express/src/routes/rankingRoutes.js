import express from "express";
import rankingController from "../controllers/rankingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/overall", authMiddleware, rankingController.getOverallRanking);
router.get("/school/:schoolId", authMiddleware, rankingController.getSchoolRanking);
router.get("/schoolrank/:schoolId", authMiddleware, rankingController.getSchoolAverageRanking);

export default router;
