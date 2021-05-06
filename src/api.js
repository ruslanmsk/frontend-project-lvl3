import axios from 'axios';

export default function get(url) {
  return axios.get(url)
    .then((response) => response).catch(() => {
      throw new Error('network');
    });
}
