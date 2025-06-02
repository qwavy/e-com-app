import { ActionIcon, Image, Modal } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';

import styles from './product-details.module.css';

interface ImageModalProps {
  images: { url: string }[];
  opened: boolean;
  onClose: () => void;
  initialIndex: number;
  alt: string;
}

export const ImageModal = ({ images, opened, onClose, initialIndex, alt }: ImageModalProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      startIndex: initialIndex,
      loop: false,
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi || !opened) {
      return undefined;
    }

    const container = emblaApi.containerNode()?.parentElement;
    if (!container) {
      return undefined;
    }

    const handleWheel = (event: WheelEvent) => {
      const isHorizontalScroll = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const direction = isHorizontalScroll ? event.deltaX : event.deltaY;

      if (direction === 0) {
        return;
      }

      event.preventDefault();
      if (direction > 0) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollPrev();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [emblaApi, opened]);

  useEffect(() => {
    if (emblaApi && opened) {
      emblaApi.scrollTo(initialIndex);
    }
  }, [emblaApi, initialIndex, opened]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="xl"
      centered
      withCloseButton
      styles={{
        body: { padding: 20 },
        content: { overflow: 'visible' },
      }}
    >
      <div className={styles['modal-wrapper']}>
        <ActionIcon
          className={styles.prevButton}
          onClick={() => emblaApi?.scrollPrev()}
          variant="filled"
          radius="xl"
          size="lg"
        >
          <IconChevronLeft />
        </ActionIcon>

        <div className={styles.embla} ref={emblaRef}>
          <div className={styles['embla-container']}>
            {images.map((img, index) => (
              <div className={styles['embla-slide']} key={index}>
                <Image src={img.url} alt={`${alt} ${index + 1}`} fit="contain" />
              </div>
            ))}
          </div>
        </div>

        <ActionIcon
          className={styles.nextButton}
          onClick={() => emblaApi?.scrollNext()}
          variant="filled"
          radius="xl"
          size="lg"
        >
          <IconChevronRight />
        </ActionIcon>
      </div>
    </Modal>
  );
};
