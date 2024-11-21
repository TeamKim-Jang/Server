import dotenv from 'dotenv';
import axios from 'axios'; // HTTP 요청 라이브러리
import sequelize from '../src/config/databases.js'; // 데이터베이스 설정
import { School } from '../src/models/user.js'; // School 모델 가져오기

dotenv.config(); // 환경 변수 로드

const API_KEY = '21dad5d8048942f79512557f795528d3'; // 발급받은 API 키 입력
const API_URL = `https://open.neis.go.kr/hub/schoolInfo?KEY=${API_KEY}&Type=json&pSize=100`;

const seedSchools = async () => {
  try {
    console.log('Authenticating Sequelize...');
    await sequelize.authenticate();
    console.log('Database connection successful.');

    const allSchoolData = []; // 모든 데이터를 누적할 배열
    let pageIndex = 1; // 초기 페이지 설정
    let isLastPage = false; // 종료 조건 플래그

    while (!isLastPage) {
      // console.log(`Fetching page ${pageIndex}...`);

      // 현재 페이지의 데이터를 가져옴
      const response = await axios.get(`${API_URL}&pIndex=${pageIndex}`);
      const schoolList = response.data?.schoolInfo?.[1]?.row || [];

      if (Array.isArray(schoolList) && schoolList.length > 0) {
        // 데이터를 변환하여 누적
        const schoolData = schoolList.map((school) => ({
          school_name: school.SCHUL_NM, // 학교 이름 필드 추출
        }));
        allSchoolData.push(...schoolData);

        console.log(`Fetched ${schoolData.length} schools from page ${pageIndex}.`);

        // 마지막 페이지에서 데이터가 불완전한지 확인
        if (schoolList.length < 100) {
          console.log('Less than 100 records fetched. Assuming this is the last page.');
          isLastPage = true;
        } else {
          pageIndex++; // 다음 페이지로 이동
        }
      } else {
        console.log('No more data to fetch.');
        isLastPage = true; // 데이터가 없으면 종료
      }
    }

    // 데이터를 School 테이블에 삽입
    // console.log(`Inserting ${allSchoolData.length} schools into database...`);
    await School.bulkCreate(allSchoolData, { ignoreDuplicates: true }); // 중복 데이터 무시
    // console.log('Schools seeded successfully.');

    // 데이터베이스 연결 종료
    await sequelize.close();
  } catch (error) {
    console.error('Error seeding schools from API:', error);
  }
};

// 스크립트 실행
seedSchools();
