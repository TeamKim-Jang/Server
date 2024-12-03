import authService from '../services/authService.js';

const authController = {
  register: async (req, res) => {
    try {
      const { user_name, nickname, birth_date, phone_number, email, password, school_name } = req.body;
      console.log(req.body);
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
      res.status(200).json(result); // 성공 응답
    } catch (error) {
      console.error("Login error:", error);
  
      // 에러 메시지에 따라 적절한 상태 코드와 메시지 반환
      if (error.message === "Invalid email or password") {
        return res.status(401).json({ error: "로그인 정보가 올바르지 않습니다." });
      }
      // 기타 예상치 못한 서버 에러 처리
      return res.status(500).json({ error: "서버에서 문제가 발생했습니다. 다시 시도해주세요." });
    }
  },  
};

export default authController;
