document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  const regionItems = document.querySelectorAll('.region-item');

  let currentPosition = 0;
  const itemWidth = regionItems[0].offsetWidth + 20;
  const visibleItems = Math.floor(
    document.querySelector('.slider-wrapper').offsetWidth / itemWidth
  );
  const maxPosition = regionItems.length - visibleItems;

  updateSliderPosition();

  prevButton.addEventListener('click', function () {
    if (currentPosition > 0) {
      currentPosition--;
      updateSliderPosition();
    }
  });

  nextButton.addEventListener('click', function () {
    if (currentPosition < maxPosition) {
      currentPosition++;
      updateSliderPosition();
    }
  });

  regionItems.forEach((item) => {
    item.addEventListener('click', function () {
      regionItems.forEach((i) => i.classList.remove('active'));

      this.classList.add('active');

      const itemIndex = Array.from(regionItems).indexOf(this);
      if (itemIndex < currentPosition) {
        currentPosition = itemIndex;
        updateSliderPosition();
      } else if (itemIndex >= currentPosition + visibleItems) {
        currentPosition = itemIndex - visibleItems + 1;
        updateSliderPosition();
      }
    });
  });

  function updateSliderPosition() {
    const translateX = -currentPosition * itemWidth;
    slider.style.transform = `translateX(${translateX}px)`;

    prevButton.disabled = currentPosition === 0;
    nextButton.disabled = currentPosition >= maxPosition;

    prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
    nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
  }

  window.addEventListener('resize', function () {
    const newVisibleItems = Math.floor(
      document.querySelector('.slider-wrapper').offsetWidth / itemWidth
    );
    const newMaxPosition = regionItems.length - newVisibleItems;

    if (currentPosition > newMaxPosition) {
      currentPosition = Math.max(0, newMaxPosition);
    }

    updateSliderPosition();
  });
});
