import client from '../config/elasticsearch.js';

const indexName = 'schools';

const schoolService = {
  async indexData(data) {
    try {
      const bulkBody = data.flatMap((school) => [
        { index: { _index: indexName } },
        { id: school.id, name: school.name },
      ]);

      const { body } = await client.bulk({ refresh: true, body: bulkBody });
      console.log('Indexing result:', body);
    } catch (error) {
      console.error('Error indexing data:', error);
    }
  },

  async searchSchools(keyword) {
    try {
      const { hits } = await client.search({
        index: indexName,
        body: {
          query: {
            match_phrase_prefix: {
              name: keyword,
            },
          },
        },
      });

      return hits.hits.map((hit) => hit._source);
    } catch (error) {
      console.error('Error searching schools:', error);
      throw new Error('Failed to search schools');
    }
  },
};

export default schoolService;
