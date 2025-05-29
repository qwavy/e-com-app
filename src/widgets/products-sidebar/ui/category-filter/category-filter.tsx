import { Box, Button, Collapse, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface Props {
  name: string;
}

export const CategoryFilter = ({ category }: Props) => {
  const [opened, { toggle }] = useDisclosure(false);
  console.log('good');
  console.log(name);
  return (
    <Box maw={400} mx="auto">
      <Group justify="center" mb={5}>
        <Button onClick={toggle}>{category.name.en}</Button>
      </Group>

      <Collapse in={opened}>
        <Text>{category.name.en}</Text>
      </Collapse>
    </Box>
  );
};
