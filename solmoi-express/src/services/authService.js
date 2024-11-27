import bcrypt from 'bcrypt';
import { User, School } from '../models/user.js'; // User와 School을 함께 import
import generateToken from '../utils/generateToken.js';

const authService = {
  registerUser: async (user_name, nickname, birth_date, phone_number, email, password, school_name) => {
    try {
      console.log('Register Input Data:', { user_name, nickname, birth_date, phone_number, email, password, school_name });

      // 이메일 중복 확인
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('Email already exists');
      }

      // 날짜 유효성 검사
      if (!birth_date || isNaN(new Date(birth_date).getTime())) {
        throw new Error('Invalid birth_date format. Expected format: YYYY-MM-DD');
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
        school_id: school.id,
      });

      console.log('User Successfully Created:', newUser);

      return { message: 'User registered successfully' };
    } catch (error) {
      console.error('Error in registerUser:', error.message);
      throw new Error('Registration failed. Please try again later.');
    }
  },

  loginUser: async (email, password) => {
    try {
      console.log('Login Input Data:', { email, password });

      // 이메일 확인
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('Invalid credentials'); // 이메일 오류와 비밀번호 오류를 구분하지 않음
      }

      // 비밀번호 확인
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials'); // 이메일 오류와 비밀번호 오류를 구분하지 않음
      }

      // 토큰 생성
      const token = generateToken(user.id);
      console.log('Generated Token:', token);

      return { token };
    } catch (error) {
      console.error('Error in loginUser:', error.message);
      throw new Error('Login failed. Please try again later.');
    }
  },
};

export default authService;
