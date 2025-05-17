import { Button, Text } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';

export const Error = ({ context, id, innerProps }: ContextModalProps<{ modalBody: string }>) => (
  <>
    <Text size="xl">{innerProps.modalBody}</Text>
    <Button fullWidth mt="lg" onClick={() => context.closeModal(id)}>
      Close modal
    </Button>
  </>
);
