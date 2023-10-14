import React from 'react';
import { useRef, useState, useId, useEffect, useCallback } from 'react'
import styled, { css } from "styled-components/macro";
import ImageOverlapDetectorService from '../services/ImageOverlapDetectorService';
import ImageContainer from '../interfaces/interfaces';
import ImagesContainer from '../containers/ImagesContainer';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const DraggableImage = styled.img`
  position: absolute;
  z-index: 1;
  left: 20px;
  top: 20px;
  overflow: hidden
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
  const [move, setMove] = useState(false);
  const elementRef = useRef<HTMLImageElement>(null);


  const preventBackgroundScroll = (event) => {
    event.preventDefault();
  };

  const onTouchStart = () => {
    document.addEventListener('touchmove', preventBackgroundScroll, { passive: false });
  }

  const onTouchEnd = (event) => {
    // console.log(event.target.id)
    const listImages = document.querySelectorAll('img[id]')
    document.removeEventListener('touchmove', preventBackgroundScroll)

    const overlapedImageArray = ImageOverlapDetectorService(event.target, listImages)
    const imageContainer = ImagesContainer.find((container) => container.id === event.target.id);
    const imageActions = imageContainer.actions.find((action) => action.object === overlapedImageArray[0]);

    if ((imageActions) && (imageActions.action === 'rotate')) {
      const existingTransform = elementRef.current.style.transform;
      elementRef.current.style.transform = `${existingTransform} rotate(90deg)`;
    }

  }

  const onMouseDown = useCallback((event) => {
    event.persist();
    if (event.nativeEvent instanceof MouseEvent) {
      const onMouseMove = (event: MouseEvent) => {
        position.x += event.movementX;
        position.y += event.movementY;
        const element = elementRef.current;
        if (element) {
          element.style.transform = `translate(${position.x}px, ${position.y}px)`;
        }
        setPosition(position);
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    } else if (event.nativeEvent instanceof TouchEvent) {

      const onTouchMove = (event: TouchEvent) => {
        const touch = event.touches[0];
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


      const onTouchEnd = () => {
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
      };

      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", onTouchEnd);
    }
  }, [position, setPosition, elementRef]);

  return (
    <ImageWithRef ref={elementRef}
      onMouseDown={onMouseDown}
      onTouchMove={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd} src={imageContainer.img}
      id={imageContainer.id}>
    </ImageWithRef>
  );
};

export default DraggableComponent;