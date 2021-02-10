import axios from 'axios';

export default function get() {
  return axios.get('https://ru.hexlet.io/lessons.rss')
    .then((response) => {
      if (!response.headers['content-type'].includes('application/rss+xml')) {
        throw new Error('Invalid content type');
      }
      return response;
    });
}
