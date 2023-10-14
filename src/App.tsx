import React from 'react';
import './App.css';
import styled, { css } from "styled-components/macro";

import house1 from './assets/house_1_v2.png';
import DraggableComponent from './components/DraggableComponent'
import ImagesContainer from './containers/ImagesContainer'

const Container = styled.img`
position: absolute;
  width: 400px;
  height: 300px;
  top: 300px;
  left: 1400px;
  overflow: hidden;
`;

const Container2 = styled.img`
position: absolute;
  width: 300px;
  height: 100px;
  top: 120px;
  left: 800px;
  overflow: hidden;
`;

const ScrollContainer = styled.div`
  // overflow-x: auto;
  white-space: nowrap;
`;

const Image = styled.img`
  // position: absolute;
  width: 2700px;
  // overflow: auto;
  // overflow: hidden;
`;

const Body = styled.div`
  // position: fixed;
  // pointer-events: none
`
function App() {
  const draggableImages = ImagesContainer.map((image) => {
    return <DraggableComponent imageContainer={image} key={image.id} />
  });

  return (
    <Body>
      <Image src={house1} alt="Your Image" />
      <Container id={'bad'} />
      <Container2 id={'bad'} />
      {draggableImages}
    </Body>

  );
}

export default App;
