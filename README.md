# Git Convention

### Git branch 전략

- `main`
    - 실제 배포 CI/CD용 branch
- `feature`
    - 기능 구현용 branch

---

### 개발 전 작업

1. **Issue 발행**
    1. 리뷰어 설정
    2. branch 생성 : `issue_name/issue_number`
        
        ex) `feature/12`  `refactor/35` 
        
    
2. **`git fetch` && `git pull`** 

---

### Issue 종류

- `chore` : 프로젝트 기본 세팅
- `feature` : 기능 구현
- `fix` : 버그 수정
- `refactor` : 코드 리팩토링

---

### Git Commit Message Convention

```
[Issue_종류] 구현_내용 #이슈_번호
ex)[feature] 로그인 화면 추가 #4
```

- Pull Request만 날리고, Approve는 reviewer가 한다.

---

### PR 제목

브랜치명 구현한 기능

ex) `feature/12 프론트엔드 초기세팅`

---

### Package Convention

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

---
