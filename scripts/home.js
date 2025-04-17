const slideData = [
  {
    title: '한국관광공사X카카오모빌리티',
    content: '댕댕이도 함께 가요🐾<br>댕댕 여행 지도',
    detail: '자세히 보기',
    image: 'assets/images/home_slide1.png',
    bgColor: '#FFFFDE',
  },
  {
    title: '방문자 수로 본 인기 급상승 도시',
    content: '데이터로 본 지역별<br>핫플레이스!<br>뜨는 도시 7',
    detail: '자세히 보기',
    image: 'assets/images/home_slide3.png',
    bgColor: '#FEF1F7',
  },
  {
    title: '사진 속 친환경 여행지를 맞혀보자!',
    content: '4월은 지구의 달🌎<br>에코 감수성 테스트',
    detail: '자세히 보기',
    image: 'assets/images/home_slide2.png',
    bgColor: '#D9EFFF',
  },
  {
    title: '봄으로 물드는 지금,',
    content: '남원에서 만끽하는<br>아날로그 여행',
    detail: '자세히 보기',
    image: 'assets/images/home_slide4.png',
    bgColor: '#DEDEFF',
  },
  {
    title: '봄 청취로 가득!',
    content: '마음까지 화사해지는<br>매화 명소 추천 3',
    detail: '자세히 보기',
    image: 'assets/images/home_slide5.png',
    bgColor: '#FFFFF5',
  },
  {
    title: '전국 벚꽃 개화 시기 총정리',
    content: '봄을 만끽해 봄🌸<br>2025 벚꽃 개화 지도',
    detail: '자세히 보기',
    image: 'assets/images/home_slide6.png',
    bgColor: '#FEF2F5',
  },
];

let currentIndex = 0;
let progressTimer = null;

const container = document.getElementById('slide_container');
const mainContent = document.querySelector('.main_content');
const progressBar = document.getElementById('progressBar');
const mainSlider = document.getElementById('main_slider');
const mainImg = document.getElementById('main_img');
const pageNumText = document.getElementById('pageNumText');

// 모든 슬라이드 렌더
function renderAllSlides() {
  const textSlider = document.getElementById('textSlider');
  const imageSlider = document.getElementById('imageSlider');

  textSlider.innerHTML = '';
  imageSlider.innerHTML = '';

  slideData.forEach((data) => {
    const textSlide = document.createElement('div');
    textSlide.className = 'slide_text';
    textSlide.innerHTML = `
      <div class="slide_title">${data.title}</div>
      <div class="slide_content">${data.content}</div>
      <div class="slide_description">
        <a href="#" class="detail">${data.detail}</a>
      </div>
    `;
    textSlider.appendChild(textSlide);

    const imgSlide = document.createElement('div');
    imgSlide.className = 'slide_image';
    imgSlide.innerHTML = `<img src="${data.image}" alt="슬라이드 이미지">`;
    imageSlider.appendChild(imgSlide);
  });
}

function moveToSlide(index) {
  document.getElementById('textSlider').style.transform = `translateX(-${
    index * 100
  }%)`;
  document.getElementById('imageSlider').style.transform = `translateX(-${
    index * 100
  }%)`;
  mainContent.style.backgroundColor = slideData[index].bgColor;
  pageNumText.textContent = `${String(index + 1).padStart(2, '0')}/${String(
    slideData.length
  ).padStart(2, '0')}`;

  startProgressTimer();
}

// 프로그레스 바
function startProgressTimer() {
  const totalTime = 5000;
  const interval = 100;
  const steps = totalTime / interval;
  let currentStep = 0;

  progressBar.style.width = '0%';
  progressBar.style.backgroundColor = '#000000';

  if (progressTimer) clearInterval(progressTimer);

  progressTimer = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;
    progressBar.style.width = `${progress * 100}%`;

    if (currentStep >= steps) {
      clearInterval(progressTimer);
      currentIndex = (currentIndex + 1) % slideData.length;
      moveToSlide(currentIndex);
    }
  }, interval);
}

// 초기 설정
document.addEventListener('includesLoaded', () => {
  renderAllSlides(); // 슬라이드 전체 렌더
  moveToSlide(currentIndex); // 초기 슬라이드 위치

  document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slideData.length) % slideData.length;
    moveToSlide(currentIndex);
  });

  document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slideData.length;
    moveToSlide(currentIndex);
  });
});

// 재생/정지 버튼
const playButton = document.getElementById('playButton');
let isPlaying = true;

playButton.addEventListener('click', () => {
  const playIcon = playButton.querySelector('img');

  if (isPlaying) {
    playIcon.src = 'assets/images/btn_slide_play02.png';
    playIcon.alt = '정지';
    clearInterval(progressTimer);
  } else {
    playIcon.src = 'assets/images/btn_slidem_m_stop02.png';
    playIcon.alt = '재생';
    startProgressTimer();
  }

  isPlaying = !isPlaying;
});
