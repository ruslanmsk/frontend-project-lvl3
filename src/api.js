import axios from 'axios';

export default (url) => axios.get(url)
  .catch(() => {
    throw new Error('network');
  });
