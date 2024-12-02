import express from 'express';
import PredictionController from ("../controllers/predictionController");
const router = express.Router();

router.get("/game-status/:userId", PredictionController.getGameStatus);
router.post("/predict", PredictionController.createPrediction);

module.exports = router;
