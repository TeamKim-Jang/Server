import express from "express";
import { User } from "../models/index.js";

const router = express.Router();

// 쏠잎 포인트 조회 API
router.get("/:user_id/total_sol_leaf", async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findOne({
      where: { user_id },
      attributes: ["total_sol_leaf"], // 필요한 필드만 가져오기
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "사용자를 찾을 수 없습니다." });
    }

    res.status(200).json({ success: true, total_sol_leaf: user.total_sol_leaf });
  } catch (error) {
    console.error("❌ 사용자 조회 실패:", error.message);
    res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
  }
});

export default router;
