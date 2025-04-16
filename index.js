document.querySelectorAll(".picsum").forEach(img => {
    const width = 600;
    const height = 800;
    const randomNum = Math.floor(Math.random() * 100000); // numero grande per evitare ripetizioni
    img.src = `https://picsum.photos/${width}/${height}?random=${randomNum}`;
  });