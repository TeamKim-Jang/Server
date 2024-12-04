// config/elasticsearch.js
import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: '0SvqMfr7kpBXUTq4x6CB',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default client;
