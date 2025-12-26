# My React App

React Router와 체계적인 폴더 구조를 사용한 React 애플리케이션입니다.

## 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 컴포넌트
│   ├── Button.js
│   └── Card.js
├── pages/         # 페이지 컴포넌트
│   ├── Home.js
│   ├── About.js
│   └── Contact.js
├── layouts/       # 레이아웃 컴포넌트
│   ├── Header.js
│   ├── Footer.js
│   └── Layout.js
├── styles/        # CSS 스타일 파일들
│   ├── Header.css
│   ├── Footer.css
│   ├── Layout.css
│   ├── Button.css
│   ├── Card.css
│   ├── Home.css
│   ├── About.css
│   └── Contact.css
├── assets/        # 정적 파일들
│   ├── images/    # 이미지 파일
│   └── icons/     # 아이콘 파일
├── hooks/         # 커스텀 훅
│   └── useLocalStorage.js
├── utils/         # 유틸리티 함수
│   └── helpers.js
└── constants/     # 상수 정의
    └── index.js
```

## 주요 기능

- **React Router**: 페이지 라우팅
- **컴포넌트 기반 구조**: 재사용 가능한 컴포넌트
- **반응형 디자인**: 모바일 친화적 레이아웃
- **모듈화된 스타일**: 각 컴포넌트별 CSS 파일
- **유틸리티 함수**: 헬퍼 함수들
- **커스텀 훅**: 로컬 스토리지 관리

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
```

## 사용된 기술

- React 19.1.0
- React Router DOM
- CSS3
- JavaScript ES6+

## 페이지

- **홈** (`/`): 메인 페이지
- **소개** (`/about`): 소개 페이지
- **연락처** (`/contact`): 연락처 페이지

## 컴포넌트

### 재사용 가능한 컴포넌트

- **Button**: 다양한 스타일과 크기의 버튼
- **Card**: 카드 형태의 컨테이너

### 레이아웃 컴포넌트

- **Header**: 네비게이션 헤더
- **Footer**: 푸터
- **Layout**: 전체 레이아웃 래퍼

## 스타일 가이드

### 색상

- Primary: #007bff
- Secondary: #6c757d
- Success: #28a745
- Danger: #dc3545
- Warning: #ffc107
- Info: #17a2b8

### 반응형 브레이크포인트

- 모바일: 768px 이하
- 태블릿: 768px - 1024px
- 데스크톱: 1024px 이상
