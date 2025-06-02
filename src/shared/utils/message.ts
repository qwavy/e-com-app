import { notifications } from '@mantine/notifications';

export const message = ({ title = '', message = '' }) => {
  const color = title ? 'red' : 'green';
  notifications.show({
    position: 'top-center',
    title,
    autoClose: 5000,
    message,
    color,
  });
};
