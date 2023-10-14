const ImageOverlapDetectorService = (event) => {
  const listImages = document.querySelectorAll('img[id]')

  const checkOverlap = (event, listImages) => {
    const currentImage = event
    const currentRect = event.getBoundingClientRect();
    const interseptedImagesIds = [];

    listImages.forEach(image => {
      if (image.id !== currentImage.id) {
        const rect = image.getBoundingClientRect();
        const intersectionWidth = Math.max(0, Math.min(currentRect.right, rect.right) - Math.max(currentRect.left, rect.left));
        const intersectionHeight = Math.max(0, Math.min(currentRect.bottom, rect.bottom) - Math.max(currentRect.top, rect.top));
        const intersectionArea = intersectionWidth * intersectionHeight;
        const area1 = (currentRect.right - currentRect.left) * (currentRect.bottom - currentRect.top);
        const area2 = (rect.right - rect.left) * (rect.bottom - rect.top);
        const percentage1 = intersectionArea / area1;
        const percentage2 = intersectionArea / area2;
        const max = Math.max(percentage1, percentage2);
        if (
          max > 0.5
        ) {
          interseptedImagesIds.push(image.id);
        }
      }
    });

    console.log(`Number of images underneath: ${interseptedImagesIds}`);
    return interseptedImagesIds;
  };

  return checkOverlap(event, listImages)
};

export default ImageOverlapDetectorService;