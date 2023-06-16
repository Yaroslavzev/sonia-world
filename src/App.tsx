import React from 'react';
import './App.css';
import styled, { css } from "styled-components/macro";

import house1 from './assets/house_1_v2.png';
import per1 from './assets/person_1.jpeg';
import per2 from './assets/person_2_v1_small.png';
import per3 from './assets/person_3_v1.png';
import per4 from './assets/person_4_v1.png';
import per5 from './assets/person_5_v1.png';

import DraggableComponent from './components/DraggableComponent'

  
const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const ScrollContainer = styled.div`
  overflow-x: auto;
  white-space: nowrap;
`;

const Image = styled.img`
  width: 2700px;
`;

function App() {
  return (
    <div>
      
    <ScrollContainer>
      <Image src={house1} alt="Your Image" />

    </ScrollContainer>
    
    <DraggableComponent image={per1}/>
      <DraggableComponent image={per2}/>
      <DraggableComponent image={per3}/>
      <DraggableComponent image={per4}/>
      <DraggableComponent image={per5}/>
    </div>
    
  );
}

export default App;
