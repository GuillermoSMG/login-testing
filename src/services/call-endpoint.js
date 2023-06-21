import axios from 'axios';

export const callEndpoint = async data => {
  return axios
    .post('https://rickandmortyapi.com/api/character/479', data)
    .then(res => res.data);
};
