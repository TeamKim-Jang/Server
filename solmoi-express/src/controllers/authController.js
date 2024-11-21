import authService from '../services/authService.js';

const authController = {
  register: async (req, res) => {
    try {
      const { user_name, nickname, birth_date, phone_number, email, password, school_name } = req.body;

      // 회원가입 처리
      const result = await authService.registerUser(
        user_name,
        nickname,
        birth_date,
        phone_number,
        email,
        password,
        school_name
      );
      res.status(201).json(result);
    } catch (error) {
      console.error("Register error:", error);

      // 이메일 중복 처리
      if (error.message === "Email already exists") {
        return res.status(400).json({ error: "이미 사용 중인 이메일입니다." });
      }

      // 기타 에러 처리
      return res.status(500).json({ error: "회원가입 처리 중 문제가 발생했습니다." });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // 로그인 처리
      const result = await authService.loginUser(email, password);
      res.status(200).json(result);
    } catch (error) {
      console.error("Login error:", error);

      // 이메일 또는 비밀번호가 틀린 경우
      if (error.message === "Invalid email or password") {
        return res.status(401).json({ error: "로그인 정보가 올바르지 않습니다." });
      }

      // 서버 연결 또는 기타 에러 처리
      return res.status(500).json({ error: "로그인 처리 중 문제가 발생했습니다." });
    }
  },
};

export default authController;
