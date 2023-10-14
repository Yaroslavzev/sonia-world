import React from 'react';
import { useRef, useState, useId, useEffect, useCallback } from 'react'
import styled, { css } from "styled-components/macro";
import ImageOverlapDetectorService from '../services/ImageOverlapDetectorService';
import ImageContainer from '../interfaces/interfaces';
import ImagesContainer from '../containers/ImagesContainer';

const DraggableImage = styled.img`
  position: absolute;
  z-index: 1;
  left: 20px;
  top: 20px;
  overflow: hidden;
  touch-action: none;
`;

const ImageWithRef = React.forwardRef<HTMLImageElement, React.ComponentPropsWithoutRef<'img'>>((props, ref) => {
  const id = props.id;

  return <DraggableImage ref={ref} id={id} {...props} />;
});

interface DraggableComponentProps {
  imageContainer: ImageContainer;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ imageContainer }) => {

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLImageElement>(null);


  const preventBackgroundScroll = (event) => {
    // event.stopPropagation();
    // document.documentElement.style.overflow = 'hidden';
    // const { left, top, width, height } = elementRef.current.getBoundingClientRect();
    // const centerX = left + width / 2;
    // const centerY = top + height / 2;

    // position.x = centerX;
    // position.y = centerY;

    // setPosition(position);
    // event.preventDefault();
  };

  const onPointerDown = () => {
    document.addEventListener('pointermove', preventBackgroundScroll, { passive: false });

  }

  const onPointerUp = (event) => {
    const listImages = document.querySelectorAll('img[id]')

    const overlapedImageArray = ImageOverlapDetectorService(event.target, listImages)
    const imageContainer = ImagesContainer.find((container) => container.id === event.target.id);
    if (imageContainer) {
      const imageActions = imageContainer.actions.find((action) => action.object === overlapedImageArray[0]);
      if ((imageActions) && (imageActions.action === 'rotate')) {
        const existingTransform = elementRef.current.style.transform;
        elementRef.current.style.transform = `${existingTransform} rotate(90deg)`;
      }
    }

    document.removeEventListener('pointermove', preventBackgroundScroll)
  }

  const onPointerMove = (event) => {
    // const touch = event.touches[0];
    const touch = event;

    const { left, top, width, height } = elementRef.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    position.x += touch.clientX - centerX;
    position.y += touch.clientY - centerY;
    const element = elementRef.current;
    if (element) {
      element.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
    setPosition(position);
  };

  return (
    <ImageWithRef ref={elementRef}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      src={imageContainer.img}
      id={imageContainer.id}>
    </ImageWithRef>
  );
};

export default DraggableComponent;