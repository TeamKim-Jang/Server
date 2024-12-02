import express from "express";
import predictionController from "../controllers/predictionController.js";
const router = express.Router();

router.get("/game-status/:userId", predictionController.getGameStatus);
router.post("/predict", predictionController.createPrediction);

export default router;
