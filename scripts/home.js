const slideData = [
  {
    title: "한국관광공사X카카오모빌리티",
    content: "댕댕이도 함께 가요🐾<br>댕댕 여행 지도",
    detail: "자세히 보기",
    image: "assets/images/home_slide1.png",
    bgColor: "#FFFFDE",
  },
  {
    title: "방문자 수로 본 인기 급상승 도시",
    content: "데이터로 본 지역별<br>핫플레이스!<br>뜨는 도시 7",
    detail: "자세히 보기",
    image: "assets/images/home_slide3.png",
    bgColor: "#FEF1F7",
  },
  {
    title: "사진 속 친환경 여행지를 맞혀보자!",
    content: "4월은 지구의 달🌎<br>에코 감수성 테스트",
    detail: "자세히 보기",
    image: "assets/images/home_slide2.png",
    bgColor: "#D9EFFF",
  },
  {
    title: "봄으로 물드는 지금,",
    content: "남원에서 만끽하는<br>아날로그 여행",
    detail: "자세히 보기",
    image: "assets/images/home_slide4.png",
    bgColor: "#DEDEFF",
  },
  {
    title: "봄 청취로 가득!",
    content: "마음까지 화사해지는<br>매화 명소 추천 3",
    detail: "자세히 보기",
    image: "assets/images/home_slide5.png",
    bgColor: "#FFFFF5",
  },
  {
    title: "전국 벚꽃 개화 시기 총정리",
    content: "봄을 만끽해 봄🌸<br>2025 벚꽃 개화 지도",
    detail: "자세히 보기",
    image: "assets/images/home_slide6.png",
    bgColor: "#FEF2F5",
  },
];

let currentIndex = 0;
const container = document.getElementById("slide_container");
const slideContainer = document.getElementById("slide_page");
const mainContent = document.querySelector(".main_content");
const progressBar = document.getElementById("pageNum");

function renderSlide(index) {
  const data = slideData[index];

  // 전체 배경색 설정
  mainContent.style.backgroundColor = data.bgColor;

  // 내용 렌더링
  container.innerHTML = `
    <ul class="slide_content">
      <li class="title">${data.title}</li>
      <li class="content">${data.content}</li>
      <li class="description">
        <a href="#" class="detail" target="_self">${data.detail}</a>
      </li>
    </ul>
    <div class="slide_img">
      <img src="${data.image}" class="img" />
    </div>
  `;

  progressBar.value = index + 1;
  progressBar.max = slideData.length;
}

document.querySelector(".prev").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderSlide(currentIndex);
  }
});

document.querySelector(".next").addEventListener("click", () => {
  if (currentIndex < slideData.length - 1) {
    currentIndex++;
    renderSlide(currentIndex);
  }
});

renderSlide(currentIndex);