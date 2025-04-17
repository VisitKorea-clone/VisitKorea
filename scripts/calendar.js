document.addEventListener('DOMContentLoaded', () => {
  initCalendar();
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

function filterSliderByDate(selectedDate) {
  //필터링 로직
}
