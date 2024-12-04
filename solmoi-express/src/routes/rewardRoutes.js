import express from "express";
import { User, RewardHistory } from "../models/index.js"; 
import { Op } from "sequelize";

const router = express.Router();

// 뽑기 처리 API
router.post("/draw", async (req, res) => {
  const { user_id, reward_value } = req.body;

  if (!user_id) {
    return res.status(400).json({ success: false, message: "사용자 ID가 필요합니다." });
  }

  const today = new Date().toISOString().split("T")[0];

  try {
    // 오늘 이미 뽑기를 했는지 확인
    const existingDraw = await RewardHistory.findOne({
      where: { user_id, draw_date: today },
    });

    if (existingDraw) {
      return res.status(200).json({
        success: false,
        message: "오늘 이미 뽑기를 했습니다.",
      });
    }

    // 뽑기 기록 생성
    await RewardHistory.create({
      user_id,
      reward_value,
      draw_date: today,
    });

    // User 모델의 total_sol_leaf 업데이트
    if (reward_value > 0) {
      await User.increment("total_sol_leaf", {
        by: reward_value,
        where: { user_id },
      });
    }

    res.status(201).json({
      success: true,
      message: reward_value === 0 ? "꽝입니다." : `${reward_value} 쏠잎 지급 완료`,
    });
  } catch (error) {
    console.error("❌ 뽑기 처리 오류:", error.message);
    res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다.",
    });
  }
});

export default router;
