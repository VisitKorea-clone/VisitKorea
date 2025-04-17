document.addEventListener('DOMContentLoaded', () => {
  initCalendar();
  initSlider();
});

function initCalendar() {
  const daysContainer = document.querySelector('.days-container');
  const label = document.querySelector('#monthLabel');
  const prevBtn = document.querySelector('.nav-btn.prev');
  const nextBtn = document.querySelector('.nav-btn.next');

  const displayedDaysCount = 14;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const allowedMin = new Date(today.getFullYear(), today.getMonth() - 3, 1);
  const allowedMax = new Date(today.getFullYear(), today.getMonth() + 3 + 1, 0);

  let currentViewStart = new Date(today);

  function getDayAbbreviation(date) {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
  }

  function createDayItem(date) {
    const dayItem = document.createElement('div');
    dayItem.classList.add('day-item');
    dayItem.dataset.date = date.toISOString();

    if (date.getDay() === 6) {
      dayItem.classList.add('saturday');
    } else if (date.getDay() === 0) {
      dayItem.classList.add('sunday');
    }

    const dayNumber = document.createElement('div');
    dayNumber.classList.add('day-number');
    dayNumber.textContent = date.getDate();

    const dayName = document.createElement('div');
    dayName.classList.add('day-name');
    if (date.getTime() === today.getTime()) {
      dayName.textContent = '오늘';
    } else {
      dayName.textContent = getDayAbbreviation(date);
    }

    dayItem.appendChild(dayNumber);
    dayItem.appendChild(dayName);

    dayItem.addEventListener('click', function () {
      document.querySelectorAll('.day-item.current').forEach(function (item) {
        item.classList.remove('current');
      });
      dayItem.classList.add('current');

      const selectedDate = new Date(dayItem.dataset.date);
      if (typeof filterSliderByDate === 'function') {
        filterSliderByDate(selectedDate);
      }
    });

    return dayItem;
  }

  function renderCalendar() {
    daysContainer.innerHTML = '';

    const month = currentViewStart.getMonth() + 1;
    const year = currentViewStart.getFullYear();
    label.textContent = `${year}.${month}`;

    for (let i = 0; i < displayedDaysCount; i++) {
      let currentDate = new Date(currentViewStart);
      currentDate.setDate(currentViewStart.getDate() + i);

      if (currentDate > allowedMax) break;
      const dayItem = createDayItem(currentDate);
      daysContainer.appendChild(dayItem);
    }

    const firstDay = daysContainer.firstElementChild;
    if (firstDay) {
      document.querySelectorAll('.day-item.current').forEach(function (item) {
        item.classList.remove('current');
      });
      firstDay.classList.add('current');

      const selectedDate = new Date(firstDay.dataset.date);
      if (typeof filterSliderByDate === 'function') {
        filterSliderByDate(selectedDate);
      }
    }
  }

  function updateView(deltaDays) {
    let newStart = new Date(currentViewStart);
    newStart.setDate(newStart.getDate() + deltaDays);

    if (newStart < allowedMin) {
      newStart = new Date(allowedMin);
    }

    const potentialEnd = new Date(newStart);
    potentialEnd.setDate(newStart.getDate() + displayedDaysCount - 1);
    if (potentialEnd > allowedMax) {
      const diffMs = potentialEnd.getTime() - allowedMax.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      newStart.setDate(newStart.getDate() - diffDays);
    }
    if (newStart < allowedMin) {
      newStart = new Date(allowedMin);
    }

    currentViewStart = newStart;
    renderCalendar();
  }

  prevBtn.addEventListener('click', function () {
    updateView(-14);
  });
  nextBtn.addEventListener('click', function () {
    updateView(14);
  });

  renderCalendar();
}

function initSlider() {
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const sliderDotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('button.slider-nav.prev');
  const nextBtn = document.querySelector('button.slider-nav.next');

  let festivals = [];
  window.currentSlide = 0;

  function createSlides(data) {
    sliderWrapper.innerHTML = '';
    sliderDotsContainer.innerHTML = '';

    const dummy = document.createElement('div');
    dummy.classList.add('slide', 'dummy-slide');
    dummy.style.visibility = 'hidden';
    dummy.style.marginRight = '500px';
    sliderWrapper.appendChild(dummy);

    sliderWrapper.style.display = 'flex';
    sliderWrapper.style.transition = 'transform 0.3s ease-in-out';

    data.forEach((fest, index) => {
      const slideDiv = document.createElement('div');
      slideDiv.classList.add('slide');
      if (index === 0) slideDiv.classList.add('active');

      const contentDiv = document.createElement('div');
      contentDiv.classList.add('slide-content');

      const imageDiv = document.createElement('div');
      imageDiv.classList.add('slide-image');
      const img = document.createElement('img');
      img.src = fest.image;
      img.alt = fest.title;
      imageDiv.appendChild(img);

      const infoDiv = document.createElement('div');
      infoDiv.classList.add('slide-info');
      const titleH2 = document.createElement('h2');
      titleH2.classList.add('event-title');
      titleH2.textContent = fest.title;

      const locationP = document.createElement('p');
      locationP.classList.add('event-location');
      locationP.textContent = fest.location;

      const detailsDiv = document.createElement('div');
      detailsDiv.classList.add('event-details');

      const periodDiv = document.createElement('div');
      periodDiv.classList.add('detail-col');
      const periodLabel = document.createElement('div');
      periodLabel.classList.add('detail-label');
      periodLabel.textContent = '기간';
      const periodValue = document.createElement('div');
      periodValue.classList.add('detail-value');
      periodValue.textContent = fest.period;
      periodDiv.appendChild(periodLabel);
      periodDiv.appendChild(periodValue);

      const addressDiv = document.createElement('div');
      addressDiv.classList.add('detail-col');
      const addressLabel = document.createElement('div');
      addressLabel.classList.add('detail-label');
      addressLabel.textContent = '장소';
      const addressValue = document.createElement('div');
      addressValue.classList.add('detail-value');
      addressValue.textContent = fest.address;
      addressDiv.appendChild(addressLabel);
      addressDiv.appendChild(addressValue);

      detailsDiv.appendChild(periodDiv);
      detailsDiv.appendChild(addressDiv);

      const buttonsDiv = document.createElement('div');
      buttonsDiv.classList.add('event-buttons');
      const btnDetail = document.createElement('button');
      btnDetail.classList.add('btn', 'btn-dark');
      btnDetail.textContent = '바로가기';
      btnDetail.onclick = () => window.open(fest.buttons.detail, '_blank');

      const btnGoNow = document.createElement('button');
      btnGoNow.classList.add('btn', 'btn-light');
      btnGoNow.textContent = '길찾기';
      btnGoNow.onclick = () => window.open(fest.buttons.goNow, '_blank');

      buttonsDiv.appendChild(btnDetail);
      buttonsDiv.appendChild(btnGoNow);

      infoDiv.appendChild(titleH2);
      infoDiv.appendChild(locationP);
      infoDiv.appendChild(detailsDiv);
      infoDiv.appendChild(buttonsDiv);

      contentDiv.appendChild(imageDiv);
      contentDiv.appendChild(infoDiv);
      slideDiv.appendChild(contentDiv);

      sliderWrapper.appendChild(slideDiv);

      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        window.currentSlide = index;
        updateSlider();
      });
      sliderDotsContainer.appendChild(dot);
    });
  }

  function updateSlider() {
    const slides = sliderWrapper.querySelectorAll('.slide:not(.dummy-slide)');
    if (!slides.length) return;

    const slideWidth = slides[0].offsetWidth;
    const moveX = window.currentSlide * slideWidth;

    sliderWrapper.style.transform = `translateX(-${moveX}px)`;

    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === window.currentSlide);
    });

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === window.currentSlide);
    });

    if (window.currentSlide === slides.length - 1) {
      nextBtn.style.display = 'none';
    } else {
      nextBtn.style.display = 'flex';
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const slides = sliderWrapper.querySelectorAll('.slide');
      if (window.currentSlide > 0) {
        window.currentSlide--;
        updateSlider();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const slides = sliderWrapper.querySelectorAll('.slide');
      if (window.currentSlide < slides.length - 1) {
        window.currentSlide++;
        updateSlider();
      }
    });
  }

  window.addEventListener('resize', () => {
    updateSlider();
  });

  fetch('./festivals.json')
    .then((response) => response.json())
    .then((data) => {
      festivals = data;

      window.festivalData = festivals;
      window.createSlides = createSlides;
      window.updateSlider = updateSlider;

      createSlides(festivals);
      updateSlider();
    })
    .catch((error) => console.error('Error loading festivals.json:', error));
}

function filterSliderByDate(selectedDate) {
  const allFestivals = window.festivalData || [];
  const filtered = allFestivals.filter((festival) => {
    // 축제 period는 "YYYY. M. D. ~ YYYY. M. D." 형식임 (예: "2025. 4. 11. ~ 2025. 4. 30.")
    const regex =
      /(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})\.\s*~\s*(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})\./;
    const match = festival.period.match(regex);
    if (match) {
      const startYear = parseInt(match[1]);
      const startMonth = parseInt(match[2]) - 1;
      const startDay = parseInt(match[3]);
      const endYear = parseInt(match[4]);
      const endMonth = parseInt(match[5]) - 1;
      const endDay = parseInt(match[6]);
      const startDate = new Date(startYear, startMonth, startDay);
      const endDate = new Date(endYear, endMonth, endDay);
      return selectedDate >= startDate && selectedDate <= endDate;
    }
    return false;
  });

  window.currentSlide = 0;
  if (filtered.length > 0) {
    window.createSlides(filtered);
    window.updateSlider();
  } else {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const sliderDotsContainer = document.querySelector('.slider-dots');
    sliderWrapper.innerHTML =
      '<div class="no-result">선택한 날짜에 해당하는 축제가 없습니다.</div>';
    sliderDotsContainer.innerHTML = '';
  }
}