import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '5fa7d14ab8dfcf5ffb154251dbe152ca',
  },
});

export default apiClient;
