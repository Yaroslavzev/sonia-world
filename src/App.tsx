import React from 'react';
import './App.css';
import styled, { css } from "styled-components/macro";

import house1 from './assets/house_1_v2.png';
import f1 from './assets/furniture_1_v1.png';
import f2 from './assets/furniture_2_v1.png';
import f3 from './assets/furniture_3_v1.png';
import f4 from './assets/furniture_4_v1.png';
import f5 from './assets/furniture_5_v1.png';
import per1 from './assets/person_1.jpeg';
import per2 from './assets/person_2_v1_small.png';
import per3 from './assets/person_3_v1.png';
import per4 from './assets/person_4_v1.png';
import per5 from './assets/person_5_v1.png';
import per6 from './assets/person_6_v1.png';

import DraggableComponent from './components/DraggableComponent'

  
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const ScrollContainer = styled.div`
  // overflow-x: auto;
  white-space: nowrap;
`;

const Image = styled.img`
  width: 2700px;
  overflow: hidden;
`;

function App() {
  return (
    <div>
      <Image src={house1} alt="Your Image" />
      <DraggableComponent image={per1} />
      {/* <DraggableComponent image={per2}/>
      <DraggableComponent image={per3}/>
      <DraggableComponent image={per4}/>
      <DraggableComponent image={per5}/>
      <DraggableComponent image={per6}/> */}
      <DraggableComponent image={f1}/>
      {/* <DraggableComponent image={f2}/>
      <DraggableComponent image={f3}/>
      <DraggableComponent image={f4}/>
      <DraggableComponent image={f5}/> */}
    </div>
    
  );
}

export default App;
