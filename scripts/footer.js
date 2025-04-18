document.addEventListener("includesLoaded", () => {
    const snsImg = document.querySelectorAll("img.img_sns");
  
    snsImg.forEach((img) => {
      const origin = img.getAttribute("src");
      const hover = origin.replace(".png", "_1.png");
  
      img.addEventListener("mouseover", () => {
        img.src = hover;
      });
  
      img.addEventListener("mouseout", () => {
        img.src = origin;
      });
    });
  });