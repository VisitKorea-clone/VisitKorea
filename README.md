
# 🇰🇷 대한민국 구석구석 클론코딩 🇰🇷
[대한민국 구석구석](https://korean.visitkorea.or.kr/main/main.do)


| **담당자** | **담당 기능** |
|---------------|-------------------------------------|
| [김지민](https://github.com/zzimnii) | 메인 페이지 - 슬라이드 구현<br>지역 페이지 - 인기여행지 섹션 구현<br>공통 컴포넌트 - Footer |
| [송유림](https://github.com/youlimsongs) | 지역 페이지 - 축제 달력 구현<br> 지역 페이지 - 우리 지역 이야기<br>공통 컴포넌트 - Header |

---

## 메인 페이지 - 슬라이드 구현
<img width="1459" alt="Image" src="https://github.com/user-attachments/assets/53695e52-fc81-4252-b31a-28e323738c3b" />

## 지역 페이지 - 전체 구현

1. 지역 선택
    
    <img width="1459" alt="Image" src="https://github.com/user-attachments/assets/fc52d325-55a4-4b32-a787-6e11b4d0b311" />
    
2. 인기 여행지/맛집/숙소 추천
    
    <img width="1459" alt="Image" src="https://github.com/user-attachments/assets/72a90637-04d9-4b9c-a905-739c1ab0d8d8" />
    
3. 지역 행사/축제 안내
    
    <img width="1459" alt="Image" src="https://github.com/user-attachments/assets/a578f58b-31fc-4c0f-9b5c-aeff38f2a761" />
    
4. 우리 지역 이야기
    
    <img width="1459" alt="Image" src="https://github.com/user-attachments/assets/4e3e511c-6fa2-49da-a983-d8b7f287108f" />
    

## 공통 부문 - Header, Navbar, Footer구현

1. Header, Navbar
    
    <img width="1459" alt="Image" src="https://github.com/user-attachments/assets/ab0fa8d8-25fc-4040-900b-15fbe3802f41" />
    
2. Footer
    <img width="1459" alt="Image" src="https://github.com/user-attachments/assets/77ae257d-a335-49e7-bda3-eaa484ca7331" />
    
---

## 🚨 Git Convention

### 📌 Git branch 전략

- `main`
    - 실제 배포 CI/CD용 branch
- `feature`
    - 기능 구현용 branch
  
### 📌  Merge Rule

- Fast-Forward merge
    - Main 브랜치에 변경이 없어 충돌이 없는 경우 merge
- Rebase merge
    - Main 브랜치에 변화가 있지만 충돌이 없는 경우 merge

### 📌 개발 전 작업

1. **Issue 발행**
    1. 리뷰어 설정
    2. branch 생성 : `issue_name/issue_number`
       ex) `feature/12`  `refactor/35`       
2. **`git fetch` && `git pull`**

### 📌 Issue 종류

- `chore` : 프로젝트 기본 세팅
- `feature` : 기능 구현
- `fix` : 버그 수정
- `refactor` : 코드 리팩토링

### 📌  Git Commit Message

```
[Issue_종류] 구현_내용 #이슈_번호
ex)[feature] 로그인 화면 추가 #4
```


### 📌  Pull Request

브랜치명/ 구현한 기능

ex) `feature/12 프론트엔드 초기세팅`



### 📌 Package Convention

```sql
project-name/
│
├── index.html
├── home.html
├── page2.html
│
├── styles/
│   └── style.css         # 전체 스타일
│
├── scripts/
│   └── main.js           # 주요 로직 (이벤트 핸들링 등)
│
└── assets/               # 이미지, 폰트 등 정적 파일
    ├── images/

```

