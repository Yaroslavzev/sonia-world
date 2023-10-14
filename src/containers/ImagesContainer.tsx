import { useId } from 'react';
import ImageContainer from '../interfaces/interfaces';


import f1 from '../assets/furniture_1_v1.png';
import f2 from '../assets/furniture_2_v1.png';
import f3 from '../assets/furniture_3_v1.png';
import f4 from '../assets/furniture_4_v1.png';
import f5 from '../assets/furniture_5_v1.png';
import per1 from '../assets/person_1.jpeg';
import per2 from '../assets/person_2_v1_small.png';
import per3 from '../assets/person_3_v1.png';
import per4 from '../assets/person_4_v1.png';
import per5 from '../assets/person_5_v1.png';
import per6 from '../assets/person_6_v1.png';

const images: { [key: string]: string } = {
   f1,
   f2,
   f3,
   f4,
   f5,
   per1,
   per2,
   per3,
   per4,
   per5,
   per6,
};

const ImagesContainer: ImageContainer[] = Object.entries(images).map(([key, value]) => {
   const id = key;

   return {
      id: id,
      img: value,
      actions: [{
         object: 'bad',
         action: 'rotate',
      }]
   }
}

);

export default ImagesContainer;