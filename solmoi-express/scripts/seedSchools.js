import dotenv from 'dotenv';
import axios from 'axios'; // HTTP 요청 라이브러리
import sequelize from '../src/config/databases.js'; // 데이터베이스 설정
import { School } from '../src/models/index.js'; // School 모델 가져오기

dotenv.config(); // 환경 변수 로드
const API_KEY = process.env.SCHOOL_API_KEY;
const API_URL = `https://open.neis.go.kr/hub/schoolInfo?KEY=${API_KEY}&Type=json&pSize=100`;

const seedSchools = async () => {
  try {
    console.log('Authenticating Sequelize...');
    await sequelize.authenticate();
    console.log('Database connection successful.');

    const allSchoolData = [];
    let pageIndex = 1;
    let isLastPage = false;

    while (!isLastPage) {
      const response = await axios.get(`${API_URL}&pIndex=${pageIndex}`);
      const schoolList = response.data?.schoolInfo?.[1]?.row || [];

      if (Array.isArray(schoolList) && schoolList.length > 0) {
        const schoolData = schoolList.map((school) => ({
          school_name: school.SCHUL_NM,
        }));
        allSchoolData.push(...schoolData);

        console.log(`Fetched ${schoolData.length} schools from page ${pageIndex}.`);

        if (schoolList.length < 100) {
          console.log('Less than 100 records fetched. Assuming this is the last page.');
          isLastPage = true;
        } else {
          pageIndex++;
        }
      } else {
        console.log('No more data to fetch.');
        isLastPage = true;
      }
    }

    await School.bulkCreate(allSchoolData, { ignoreDuplicates: true });
    await sequelize.close();
  } catch (error) {
    console.error('Error seeding schools from API:', error);
  }
};

seedSchools();
