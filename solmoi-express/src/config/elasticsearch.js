// config/elasticsearch.js
import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: '2Nnpv2*dBMJlTapY7qbR',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default client;
