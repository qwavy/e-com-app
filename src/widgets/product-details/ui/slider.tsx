import { Image } from '@mantine/core';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

import { ImageModal } from './image-modal.tsx';
import styles from './product-details.module.css';

interface ImageSliderProps {
  images: { url: string }[];
  alt?: string;
}

export const ImageSlider = ({ images, alt = 'Product image' }: ImageSliderProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [opened, setOpened] = useState(false);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    setOpened(true);
  };

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) {
      return;
    }
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <>
      <div className={styles['slider-wrapper']}>
        <div className={styles.embla} ref={emblaRef}>
          <div className={styles['embla-container']}>
            {images.map((img, index) => (
              <div className={styles['embla-slide']} key={index} onClick={() => handleClick(index)}>
                <Image
                  src={img.url}
                  alt={`${alt} ${index + 1}`}
                  fit="contain"
                  style={{ width: '70%', height: '70%' }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.thumbnails}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={`${styles.thumbnail} ${index === selectedIndex ? styles.active : ''}`}
            />
          ))}
        </div>
      </div>
      <ImageModal
        images={images}
        opened={opened}
        onClose={() => setOpened(false)}
        initialIndex={selectedIndex}
        alt={alt}
      />
    </>
  );
};
