import { BASE_URI, PROJECT_KEY } from '../config';

export const fetchProjectDetails = () => {
  return fetch(`${BASE_URI}/${PROJECT_KEY}`).then((res) => res.json());
};
