import React from 'react';

const ImageOverlapDetectorService = (event, images) => { 
    const checkOverlap = (event, images) => {
      const referenceImage = event
      const referenceRect = event.getBoundingClientRect();
      const interseptedImagesIds = [];
  
      images.forEach(image => {
        if (image.id !== referenceImage.id) {
          const rect = image.getBoundingClientRect();
          if (
            (referenceRect.left >= rect.left && referenceRect.left <= rect.right ) ||
            (referenceRect.right >= rect.left && referenceRect.right <= rect.right )
          ) {
            interseptedImagesIds.push(image.id);
          }
        }
      });
  
      console.log(`Number of images underneath: ${interseptedImagesIds}`);
    };

    checkOverlap(event, images)
  };
  
  export default ImageOverlapDetectorService;