document.addEventListener('includesLoaded', function () {
  const root = document.querySelector('.region-top');

  // 내부 요소들
  const slider = root.querySelector('.slider');
  const prevButton = root.querySelector('.prev-button');
  const nextButton = root.querySelector('.next-button');
  const regionItems = root.querySelectorAll('.slider .region-item');
  const wrapper = root.querySelector('.slider-wrapper');

  let currentPosition = 0;
  // const itemWidth = regionItems[0].offsetWidth + 10;
  const itemWidth = 90;
  let visibleItems = 8;
  // let visibleItems = Math.floor(wrapper.offsetWidth / itemWidth);
  const maxPosition = regionItems.length - visibleItems; //6번 이동

  console.log(visibleItems, maxPosition);

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
      } else if (itemIndex >= currentPosition + visibleItems) {
        currentPosition = itemIndex - visibleItems + 1;
      }
      updateSliderPosition();
    });
  });

  window.addEventListener('resize', function () {
    visibleItems = Math.floor(wrapper.offsetWidth / itemWidth);
    const newMax = regionItems.length - visibleItems;
    if (currentPosition > newMax) {
      currentPosition = Math.max(0, newMax);
    }
    updateSliderPosition();
  });

  function updateSliderPosition() {
    const translateX = -currentPosition * itemWidth;
    slider.style.transform = `translateX(${translateX}px)`;

    const atStart = currentPosition === 0;
    const atEnd = currentPosition >= regionItems.length - visibleItems;

    prevButton.disabled = atStart;
    nextButton.disabled = atEnd;

    prevButton.style.opacity = atStart ? '0.5' : '1';
    nextButton.style.opacity = atEnd + 4 ? '0.5' : '1';
  }

  window.addEventListener('resize', function () {
    const newVisibleItems = Math.floor(
      document.querySelector('.slider-wrapper').offsetWidth / itemWidth
    );
    const newMaxPosition = regionItems.length - newVisibleItems;

    // Adjust current position if needed
    if (currentPosition > newMaxPosition) {
      currentPosition = Math.max(0, newMaxPosition);
    }

    updateSliderPosition();
  });
});
