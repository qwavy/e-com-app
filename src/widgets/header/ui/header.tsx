import { fetchProjectDetails } from '../../../shared/api/api';
import { useEffect } from 'react';

export const Header = () => {
  useEffect(() => {
    fetchProjectDetails().then((res) => console.log(res));
  });

  return <h1>Header</h1>;
};
