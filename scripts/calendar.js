document.addEventListener('includesLoaded', () => {
  initCalendar();
  initSlider();
});

function initCalendar() {
  const root = document.querySelector('.region-mid');
  const daysContainer = root.querySelector('.days-container');
  const label = root.querySelector('#monthLabel');
  const prevBtn = root.querySelector('.nav-btn.prev');
  const nextBtn = root.querySelector('.nav-btn.next');

  const displayedDaysCount = 14;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const allowedMin = new Date(today.getFullYear(), today.getMonth() - 3, 1);
  const allowedMax = new Date(today.getFullYear(), today.getMonth() + 4, 0);
  let currentViewStart = new Date(today);

  function getDayAbbreviation(date) {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
  }

  function createDayItem(date) {
    const dayItem = document.createElement('div');
    dayItem.classList.add('day-item');
    dayItem.dataset.date = date.toISOString();

    if (date.getDay() === 6) dayItem.classList.add('saturday');
    else if (date.getDay() === 0) dayItem.classList.add('sunday');

    const dayNumber = document.createElement('div');
    dayNumber.classList.add('day-number');
    dayNumber.textContent = date.getDate();

    const dayName = document.createElement('div');
    dayName.classList.add('day-name');
    dayName.textContent =
      date.getTime() === today.getTime() ? '오늘' : getDayAbbreviation(date);

    dayItem.append(dayNumber, dayName);

    dayItem.addEventListener('click', () => {
      // scope to root only
      root
        .querySelectorAll('.day-item.current')
        .forEach((i) => i.classList.remove('current'));
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
      const currentDate = new Date(currentViewStart);
      currentDate.setDate(currentViewStart.getDate() + i);
      if (currentDate > allowedMax) break;
      daysContainer.appendChild(createDayItem(currentDate));
    }

    // mark first as current
    const firstDay = daysContainer.firstElementChild;
    if (firstDay) {
      root
        .querySelectorAll('.day-item.current')
        .forEach((i) => i.classList.remove('current'));
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
    if (newStart < allowedMin) newStart = new Date(allowedMin);

    const potentialEnd = new Date(newStart);
    potentialEnd.setDate(newStart.getDate() + displayedDaysCount - 1);
    if (potentialEnd > allowedMax) {
      const diffDays = Math.ceil(
        (potentialEnd - allowedMax) / (1000 * 60 * 60 * 24)
      );
      newStart.setDate(newStart.getDate() - diffDays);
    }
    if (newStart < allowedMin) newStart = new Date(allowedMin);
    currentViewStart = newStart;
    renderCalendar();
  }

  prevBtn.addEventListener('click', () => updateView(-14));
  nextBtn.addEventListener('click', () => updateView(14));

  renderCalendar();
}

function initSlider() {
  const root = document.querySelector('.region-mid');
  const sliderWrapper = root.querySelector('.slider-wrapper');
  const sliderDotsContainer = root.querySelector('.slider-dots');
  const prevBtn = root.querySelector('.slider-nav.prev');
  const nextBtn = root.querySelector('.slider-nav.next');

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

      // image
      const imageDiv = document.createElement('div');
      imageDiv.classList.add('slide-image');
      const img = document.createElement('img');
      img.src = fest.image;
      img.alt = fest.title;
      imageDiv.appendChild(img);

      // info
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
      // period
      const [startDate, endDate] = fest.period.split('~').map((s) => s.trim());
      const periodDiv = document.createElement('div');
      periodDiv.classList.add('detail-col');
      const periodLabel = document.createElement('div');
      periodLabel.classList.add('detail-label');
      periodLabel.textContent = '기간';
      const periodValue = document.createElement('div');
      periodValue.classList.add('detail-value');
      periodValue.innerHTML = `${startDate} ~<br>${endDate}`;
      periodDiv.append(periodLabel, periodValue);
      // address
      const addressDiv = document.createElement('div');
      addressDiv.classList.add('detail-col');
      const addressLabel = document.createElement('div');
      addressLabel.classList.add('detail-label');
      addressLabel.textContent = '장소';
      const addressValue = document.createElement('div');
      addressValue.classList.add('detail-value');
      addressValue.textContent = fest.address;
      addressDiv.append(addressLabel, addressValue);

      detailsDiv.append(periodDiv, addressDiv);

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
      buttonsDiv.append(btnDetail, btnGoNow);

      infoDiv.append(titleH2, locationP, detailsDiv, buttonsDiv);
      contentDiv.append(imageDiv, infoDiv);
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

    slides.forEach((s, i) =>
      s.classList.toggle('active', i === window.currentSlide)
    );

    root
      .querySelectorAll('.dot')
      .forEach((d, i) =>
        d.classList.toggle('active', i === window.currentSlide)
      );

    nextBtn.style.display =
      window.currentSlide === slides.length - 1 ? 'none' : 'flex';
  }

  prevBtn?.addEventListener('click', () => {
    if (window.currentSlide > 0) {
      window.currentSlide--;
      updateSlider();
    }
  });

  nextBtn?.addEventListener('click', () => {
    if (
      window.currentSlide <
      sliderWrapper.querySelectorAll('.slide').length - 1
    ) {
      window.currentSlide++;
      updateSlider();
    }
  });

  window.addEventListener('resize', updateSlider);

  fetch('./festivals.json')
    .then((res) => res.json())
    .then((data) => {
      festivals = data;
      window.festivalData = data;
      window.createSlides = createSlides;
      window.updateSlider = updateSlider;
      createSlides(data);
      updateSlider();
    })
    .catch((err) => console.error('Error loading festivals.json:', err));
}

function filterSliderByDate(selectedDate) {
  const root = document.querySelector('.region-mid');
  const allFestivals = window.festivalData || [];
  const filtered = allFestivals.filter((fest) => {
    const regex =
      /(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})\.\s*~\s*(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})\./;
    const m = fest.period.match(regex);
    if (!m) return false;
    const [, y1, mo1, d1, y2, mo2, d2] = m.map(Number);
    const start = new Date(y1, mo1 - 1, d1);
    const end = new Date(y2, mo2 - 1, d2);
    return selectedDate >= start && selectedDate <= end;
  });

  window.currentSlide = 0;
  if (filtered.length) {
    window.createSlides(filtered);
    window.updateSlider();
  } else {
    const sliderWrapper = root.querySelector('.slider-wrapper');
    const sliderDots = root.querySelector('.slider-dots');
    sliderWrapper.innerHTML =
      '<div class="no-result">선택한 날짜에 해당하는 축제가 없습니다.</div>';
    sliderDots.innerHTML = '';
  }
}
