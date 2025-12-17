# Vue 3 + Vuetify 프로젝트

Vue 3, TypeScript, Vuetify를 사용한 모던 웹 애플리케이션 프로젝트입니다.

## 주요 기술 스택

- ⚡️ [Vue 3](https://vuejs.org/) - Progressive JavaScript Framework
- 🎨 [Vuetify 3](https://vuetifyjs.com/) - Material Design Component Framework
- 📘 [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- 🚀 [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- 🗂 [Vue Router](https://router.vuejs.org/) - Official Router for Vue.js
- 🍍 [Pinia](https://pinia.vuejs.org/) - Intuitive, type safe, light and flexible Store for Vue
- 🎭 [Material Design Icons](https://materialdesignicons.com/) - Icon library

## 권장 IDE 설정

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 확장 프로그램을 사용하세요. (Vetur는 비활성화 필요)

## 권장 브라우저 설정

- Chromium 기반 브라우저 (Chrome, Edge, Brave 등):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Chrome DevTools에서 Custom Object Formatter 활성화](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Firefox DevTools에서 Custom Object Formatter 활성화](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## 프로젝트 설정

```sh
npm install
```

### 개발 서버 실행 (핫 리로드)

```sh
npm run dev
```

### 프로덕션 빌드 (타입 체크, 컴파일 및 최소화)

```sh
npm run build
```

### 프로덕션 빌드 미리보기

```sh
npm run preview
```

## 프로젝트 구조

```
vue-vuetify-project/
├── src/
│   ├── assets/          # 정적 리소스 (이미지, 스타일 등)
│   ├── components/      # 재사용 가능한 Vue 컴포넌트
│   ├── plugins/         # Vue 플러그인 (Vuetify 등)
│   ├── router/          # Vue Router 설정
│   ├── stores/          # Pinia 스토어
│   ├── views/           # 페이지 컴포넌트
│   ├── App.vue          # 루트 컴포넌트
│   └── main.ts          # 애플리케이션 엔트리 포인트
├── public/              # 공개 정적 파일
└── index.html           # HTML 엔트리 포인트
```

## Vuetify 사용법

이 프로젝트는 Vuetify의 모든 컴포넌트와 디렉티브를 자동으로 가져오도록 설정되어 있습니다.

```vue
<template>
  <v-btn color="primary">버튼</v-btn>
  <v-card>
    <v-card-title>카드 제목</v-card-title>
    <v-card-text>카드 내용</v-card-text>
  </v-card>
</template>
```

더 많은 컴포넌트와 사용 예제는 [Vuetify 공식 문서](https://vuetifyjs.com/en/components/all/)를 참조하세요.

## 설정 커스터마이징

[Vite Configuration Reference](https://vite.dev/config/)를 참조하세요.
