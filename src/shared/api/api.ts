import { BASE_URI, PROJECT_KEY } from '../constants/constants';

export const fetchProjectDetails = () => {
  return fetch(`${BASE_URI}/${PROJECT_KEY}`);
};
