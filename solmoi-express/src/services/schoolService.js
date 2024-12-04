import { School } from '../models/index.js';
import Trie from '../utils/trie.js';

const trie = new Trie();

//초기화
const initializeTrie = async () => {
    const schools = await School.findAll({ raw: true });
    console.log(`총 ${schools.length}개의 학교를 Trie에 삽입합니다.`);
    schools.forEach((school) => {
        trie.insert(school.school_name, {
            id: school.school_id,
            name: school.school_name,
        });
    });
};

//검색
const search = (query) => {
  console.log("Trie로 검색:", query);
  const results = trie.search(query);

  return {
    schools: results.map((result) => ({
      id: result.id,
      name: result.name,
    })),
  };
};

export default { initializeTrie, search };
