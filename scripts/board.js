const slideData = [
    {
        type: "여행지",
        title: "속초 외웅치 바다향기로",
        address: "강원 속초시",
        tag: "2024_여행가는달과함께하는",
        image: "assets/images/board/spot1.jpg",
    },
    {
        type: "여행지",
        title: "해인사(합천)",
        address: "경남 합천군",
        tag: "휴식하기좋은곳",
        image: "assets/images/board/spot2.jpg",
    },
    {
        type: "여행지",
        title: "인천대공원",
        address: "인천 남동구",
        tag: "산책하기",
        image: "assets/images/board/spot3.jpg",
    },
    {
        type: "여행지",
        title: "여수 예술랜드",
        address: "강원 속초시",
        tag: "2024_여행가는달과함께하는",
        image: "assets/images/board/spot5.jpg",
    },
    {
        type: "여행지",
        title: "통영케이블카",
        address: "경남 통영시",
        tag: "2024_여행가는달과함께하는",
        image: "assets/images/board/spot6.jpg",
    },
    {
        type: "여행지",
        title: "고성 통일전망타워",
        address: "강원 고성군",
        tag: "역사공부",
        image: "assets/images/board/spot4.jpg",
    },
    {
        type: "여행지",
        title: "서울숲",
        address: "서울 성동구",
        tag: "25_26한국관광100선",
        image: "assets/images/board/spot8.jpg",
    },
    {
        type: "여행지",
        title: "일산호수공원",
        address: "경기 고양시",
        tag: "산책하기",
        image: "assets/images/board/spot7.jpg",
    },

    {
        type: "맛집",
        title: "게으른악어",
        address: "충북 충주시",
        tag: "충주카페",
        image: "assets/images/board/restaurant1.jpg",
    },
    {
        type: "맛집",
        title: "툇마루",
        address: "강원 강릉시",
        tag: "흑임자라떼",
        image: "assets/images/board/restaurant2.jpeg",
    },
    {
        type: "맛집",
        title: "만석닭강정 본점",
        address: "강원 속초시",
        tag: "속초명물",
        image: "assets/images/board/restaurant3.jpg",
    },
    {
        type: "맛집",
        title: "조양방직",
        address: "인천 강화군",
        tag: "2024_여행가는달과함께하는",
        image: "assets/images/board/restaurant4.jpg",
    },
    {
        type: "맛집",
        title: "내추럴가든529",
        address: "경기 양평군",
        tag: "정원카페",
        image: "assets/images/board/restaurant5.jpg",
    },
    {
        type: "맛집",
        title: "덩실분식",
        address: "충북 제천시",
        tag: "TV방영맛집",
        image: "assets/images/board/restaurant6.jpg",
    },
    {
        type: "맛집",
        title: "스멜츠",
        address: "경기 광주시",
        tag: "스멜츠",
        image: "assets/images/board/restaurant7.jpg",
    },
    {
        type: "맛집",
        title: "88생선구이",
        address: "강원 속초시",
        tag: "생선구이모둠정식",
        image: "assets/images/board/restaurant8.jpg",
    },

    {
        type: "숙소",
        title: "라담[한국관광]",
        address: "전북 전주시",
        tag: "품질인증업소_전라",
        image: "assets/images/board/hotel1.jpg",
    },
    {
        type: "숙소",
        title: "신라스테이 동탄",
        address: "경기 화성시",
        tag: "신라스테이동탄",
        image: "assets/images/board/hotel2.jpg",
    },
    {
        type: "숙소",
        title: "영조관[한국관광]",
        address: "전북 전주시",
        tag: "품질인증업소_전라",
        image: "assets/images/board/hotel3.jpg",
    },
    {
        type: "숙소",
        title: "목향재",
        address: "세종",
        tag: "세종한옥",
        image: "assets/images/board/hotel4.jpg",
    },
    {
        type: "숙소",
        title: "더 플라자",
        address: "서울 중구",
        tag: "휴식하기좋은곳",
        image: "assets/images/board/hotel5.jpg",
    },
    {
        type: "숙소",
        title: "교동가온",
        address: "전북 전주시",
        tag: "전주한옥",
        image: "assets/images/board/hotel6.jpg",
    },
    {
        type: "숙소",
        title: "무아레 도그라운드",
        address: "경기 가평군",
        tag: "가평반려동물동반리조트",
        image: "assets/images/board/hotel7.jpg",
    },
    {
        type: "숙소",
        title: "오버마운틴",
        address: "경기 가평군",
        tag: "가평숙소",
        image: "assets/images/board/hotel8.jpg",
    },

];

document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.querySelector(".custom-dropdown");
    const selected = dropdown.querySelector(".selected");
    const list = dropdown.querySelector(".dropdown-list");
    const selectedText = dropdown.querySelector(".selected-text");

    const options = ["여행지", "맛집", "숙소"];
    let currentValue = "여행지";

    function updateDropdown() {
        selectedText.textContent = currentValue;

        list.innerHTML = "";
        options.filter(opt => opt !== currentValue).forEach(opt => {
            const li = document.createElement("li");
            li.textContent = opt;
            li.setAttribute("data-value", opt);
            list.appendChild(li);

            li.addEventListener("click", () => {
                currentValue = opt;
                dropdown.classList.remove("open");
                updateDropdown();
                renderCardsByType(currentValue);
            });
        });

        renderCardsByType(currentValue);
    }

    selected.addEventListener("click", () => {
        dropdown.classList.toggle("open");
        updateDropdown();
    });

    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("open");
            updateDropdown();
        }
    });

    updateDropdown();
});

function renderCardsByType(type) {
    const wrapper = document.querySelector(".board_wrapper");
    wrapper.innerHTML = "";

    const filtered = slideData.filter(data => data.type === type);

    filtered.forEach(data => {
        const card = document.createElement("div");
        card.classList.add("board_card");

        card.innerHTML = `
            <div class="image_wrapper">
                <a href="#" class="a_image">
                    <img src="${data.image}" alt="${data.title}" class="card_img">
                </a>
                <div class="heart_icon" data-liked="false"></div>
            </div>
            <div class="card_title">${data.title}</div>
            <div class="card_address">${data.address}</div>
            <div class="card_tag">#${data.tag}</div>
        `;

        wrapper.appendChild(card);
    });

    attachHeartEvent();
}

function attachHeartEvent() {
    document.querySelectorAll('.heart_icon').forEach((icon, idx) => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            const isLiked = icon.classList.toggle('liked');
            icon.setAttribute('data-liked', isLiked);
            alert(isLiked ? "좋아요 누름" : "좋아요 취소");
        });
    });
}