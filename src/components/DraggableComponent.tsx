import React from 'react';
import { useRef, useState, useEffect, useCallback } from 'react'
import styled, { css } from "styled-components/macro";

import myImage from '../assets/Skype_Picture_2023_06_10T12_00_26_662Z.jpeg';
import tatiana from '../assets/small.png';

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
`;

const ImageWithRef = React.forwardRef<HTMLImageElement, React.ComponentPropsWithoutRef<'img'>>((props, ref) => {
    return <DraggableImage ref={ref} {...props} />;
  });

  interface DraggableComponentProps {
    image: string;
  }

const DraggableComponent: React.FC<DraggableComponentProps> = ( {image} ) => {
    
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const elementRef = useRef<HTMLImageElement>(null);
  
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
          const {left, top, width, height} =  elementRef.current.getBoundingClientRect();

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
      <Container>
        <ImageWithRef ref={elementRef} onMouseDown={onMouseDown} onTouchMove={onMouseDown} src={image}>
        </ImageWithRef>
      </Container>
    );
  };
  
  export default DraggableComponent;