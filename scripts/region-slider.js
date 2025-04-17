// region-slider.js
document.addEventListener('includesLoaded', () => {
  // region-top 내부의 슬라이더 컨테이너만 선택
  const container = document.querySelector('.region-top .slider-container');
  if (!container) return;

  const prevBtn = container.querySelector('.prev-button');
  const nextBtn = container.querySelector('.next-button');
  const sliderWrapper = container.querySelector('.slider-wrapper');
  const slider = container.querySelector('.slider');
  const items = container.querySelectorAll('.region-item');

  // 한 슬라이드의 실제 이동 너비 계산 (margin 포함)
  const itemStyle = window.getComputedStyle(items[0]);
  const itemWidth = items[0].offsetWidth;
  const marginRight = parseFloat(itemStyle.marginRight);
  const marginLeft = parseFloat(itemStyle.marginLeft);
  const slideStep = itemWidth + marginLeft + marginRight;

  // 보이는 개수와 최대 인덱스
  const visibleCount = Math.floor(sliderWrapper.offsetWidth / slideStep);
  const maxIndex = Math.max(0, items.length - visibleCount);
  let currentIndex = 0;

  function updateButtons() {
    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  function slideTo(index) {
    slider.style.transform = `translateX(-${index * slideStep}px)`;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      slideTo(currentIndex);
      updateButtons();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
      slideTo(currentIndex);
      updateButtons();
    }
  });

  // 초기 상태
  updateButtons();
});
