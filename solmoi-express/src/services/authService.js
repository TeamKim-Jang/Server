//services/authService.js
import bcrypt from "bcrypt";
import { User, School } from "../models/index.js";
import generateToken from "../utils/generateToken.js";

const authService = {
  registerUser: async (
    user_name,
    nickname,
    birth_date,
    phone_number,
    email,
    password,
    school_name
  ) => {
    try {
      // 이메일 중복 확인
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("Email already exists");
      }

      // 날짜 유효성 검사
      if (!birth_date || isNaN(new Date(birth_date).getTime())) {
        throw new Error(
          "Invalid birth_date format. Expected format: YYYY-MM-DD"
        );
      }

      // 학교 정보 확인
      const school = await School.findOne({ where: { school_name } });
      if (!school) {
        throw new Error(`School with name "${school_name}" not found`);
      }

      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(password, 10);

      // User 생성
      const newUser = await User.create({
        user_name,
        nickname,
        birth_date,
        phone_number,
        email,
        password: hashedPassword,
        school_id: school.dataValues.school_id,
      });

      return { message: "User registered successfully" };
    } catch (error) {
      console.error("Error in registerUser:", error.message);
      throw new Error("Registration failed. Please try again later.");
    }
  },

  loginUser: async (email, password) => {
    try {
      console.log("Login Input Data:", { email, password });

      // 이메일 확인
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("이메일 혹은 비밀번호가 맞지 않습니다.");
      }

      // 비밀번호 확인
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("이메일 혹은 비밀번호가 맞지 않습니다.");
      }

      // 토큰 생성
      const token = generateToken(user.user_id);

      await user.update({ access_token: token });

      return {
        token,

        userName:user.user_name,
        email:user.email,
        user_id:user.user_id,

      };
    } catch (error) {
      console.error("Error in loginUser:", error.message);
      throw new Error("Login failed. Please try again later.");
    }
  },
};

export default authService;
