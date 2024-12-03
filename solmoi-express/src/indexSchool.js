import schoolService from './services/schoolService.js';
import { School } from './models/index.js';

(async () => {
  try {
    const schools = await School.findAll({ raw: true });
    await schoolService.indexData(schools);
    console.log('Data indexed successfully');
  } catch (error) {
    console.error('Error during indexing:', error);
  }
})();