import type { GuideLocaleContent } from "../../lib/guides";

/** Korean help center. The extension itself shows English here, so its labels stay in English. */
const content: GuideLocaleContent = {
  ui: {
    navLabel: "도움말 센터",
    navTitle: "Lumno 도움말 센터",
    groups: {
      about: "Lumno 알아보기",
      quickstart: "시작하기",
      trust: "호환성과 신뢰",
    },
    sections: {
      setup: "설치와 설정",
      "command-bar": "명령 바",
      "new-tab": "새 탭",
      more: "기타 기능",
      scenarios: "이럴 때",
    },
    navToggle: "목차",
    updatedLabel: "{date} 업데이트",
    tocLabel: "이 페이지에서",
    faqTitle: "자주 묻는 질문",
    previousLabel: "이전",
    nextLabel: "다음",
    homeCardLabel: "공식 사이트",
    homeCardTitle: "Lumno 홈으로",
    zoomLabel: "크게 보기",
    closeLabel: "닫기",
    copyLabel: "복사",
    copiedLabel: "복사됨",
    privacyLabel: "개인정보처리방침",
    searchPlaceholder: "도움말 검색",
    searchLabel: "도움말 센터 검색",
    searchEmpty: "검색 결과가 없습니다. 개발자에게 편하게 문의하세요.",
    searchRecommended: "추천 문서",
    searchFeedbackGroup: "WeChat 그룹 참여",
    searchFeedbackIssue: "Issue 만들기",
    searchFeedbackAuthor: "작성자에게 연락",
    stuckText: "문제가 해결되지 않았다면 GitHub에 질문하거나 X로 문의해 주세요.",
    stuckPrimary: "GitHub에서 질문하기",
    stuckSecondary: "X로 연락하기",
  },
  pages: {
    "what-is-lumno": {
      pageTitle: "Lumno란? 오픈소스 브라우저 명령 바와 새 탭 | Lumno 도움말",
      pageDescription:
        "Lumno는 무료 오픈소스 브라우저 확장 프로그램입니다. 어떤 페이지에서든 ⌘⇧K를 누르면 탭, 북마크, 방문 기록을 검색하고 사이트 안을 바로 검색하거나 AI에게 물어볼 수 있고, 새 탭도 원하는 대로 꾸밀 수 있습니다. Chrome, Edge, Dia 등 Chromium 기반 브라우저와 Firefox에서 작동합니다.",
      keywords: ["Lumno", "브라우저 명령 바", "크롬 명령 팔레트 확장", "탭 검색", "새 탭 확장 프로그램", "Arc 명령 바"],
      title: "Lumno란?",
      navTitle: "Lumno란?",
      faq: [
        { question: "Lumno는 무료인가요?", answer: "네. Lumno는 GPL-3.0 오픈소스이며 모든 기능을 무료로 사용할 수 있고, 계정을 만들 필요도 없습니다." },
        {
          question: "어떤 브라우저에서 사용할 수 있나요?",
          answer: "Chrome, Edge, Dia, Brave, Arc, Vivaldi 등 Chromium 기반 브라우저와 Firefox, 그리고 Zen 같은 Firefox 기반 브라우저에서 사용할 수 있습니다. Safari는 지원하지 않습니다. 자세한 내용은 브라우저 호환성을 참고하세요.",
        },
      ],
    },
    limitations: {
      pageTitle: "Lumno가 할 수 없는 일: 제한 사항과 대안 | Lumno 도움말",
      pageDescription:
        "Lumno는 브라우저가 아니라 확장 프로그램이라 chrome:// 페이지에서는 명령 바가 열리지 않고, Safari와 Dia의 새 탭은 지원하지 않습니다. 현재의 제한 사항과 대신 사용할 수 있는 도구를 정리했습니다.",
      keywords: ["Lumno 한계", "크롬 확장 제한 페이지", "Arc 사이드바 대안", "Dia 새 탭"],
      title: "Lumno가 할 수 없는 일",
      navTitle: "Lumno가 할 수 없는 일",
    },
    "use-cases": {
      pageTitle: "Lumno 활용 사례: 탭이 많을 때, Arc에서 옮겨 왔을 때, 개발과 글쓰기 | Lumno 도움말",
      pageDescription:
        "탭이 수십 개 열려 있을 때, Arc에서 Chrome이나 Dia로 옮겼을 때, 문서와 GitHub를 오가는 개발자, 자료 조사와 글쓰기, AI에게 먼저 묻는 습관, 깔끔한 새 탭까지, Lumno를 활용하는 대표적인 방법을 단계별로 소개합니다.",
      keywords: ["Lumno 활용", "탭이 너무 많을 때", "Arc 대안", "개발자 브라우저 확장", "AI 바로 질문"],
      title: "활용 사례",
      navTitle: "활용 사례",
    },
    faq: {
      pageTitle: "Lumno 자주 묻는 질문: 단축키, 제한된 페이지, 새 탭, 동기화 | Lumno 도움말",
      pageDescription:
        "Lumno에 관해 자주 묻는 질문입니다. 기본 단축키와 변경 방법, 단축키가 작동하지 않을 때의 확인 방법, 다른 새 탭 확장 프로그램과 함께 사용하는 방법, 지원 브라우저, 설정 동기화, 브라우징 데이터 처리 방식을 안내합니다.",
      keywords: ["Lumno 자주 묻는 질문", "Lumno FAQ", "크롬 확장 단축키 작동 안 함", "새 탭 확장 프로그램 충돌", "Lumno 무료"],
      title: "자주 묻는 질문",
      navTitle: "자주 묻는 질문",
    },
    install: {
      pageTitle: "Chrome 웹 스토어, Edge 추가 기능, Firefox 부가 기능에서 Lumno 설치하기 | Lumno 도움말",
      pageDescription:
        "Chrome, Dia, Brave, Arc에서는 Chrome 웹 스토어에서, Edge에서는 Microsoft Edge 추가 기능에서, Firefox와 Zen에서는 Firefox 부가 기능에서 설치하세요. 설치하면 환영 페이지가 열리며 바로 ⌘⇧K를 사용할 수 있습니다.",
      keywords: ["Lumno 설치", "Lumno 크롬 웹 스토어", "Lumno Edge 추가 기능", "Lumno Firefox 부가 기능", "크롬 확장 프로그램 설치"],
      title: "Lumno 설치하기",
      navTitle: "Lumno 설치하기",
      faq: [
        { question: "계정이 필요한가요?", answer: "아니요. Lumno에는 계정 시스템이 없으므로 설치 후 바로 사용할 수 있습니다." },
        {
          question: "어떻게 삭제하나요?",
          answer: "chrome://extensions(Edge는 edge://extensions)를 열고 Lumno를 찾아 삭제를 클릭하세요. Firefox에서는 about:addons에서 삭제할 수 있습니다. Lumno가 기기에 저장한 설정과 이미지도 함께 지워집니다.",
        },
      ],
    },
    "keyboard-shortcuts": {
      pageTitle: "Lumno 단축키 총정리: 기본 단축키, 변경 방법, 모든 키 | Lumno 도움말",
      pageDescription:
        "Lumno는 ⌘⇧K(Windows는 Ctrl+Shift+K)로 열고, 최근 탭 전환기는 ⌥Q(Alt+Q)로 엽니다. chrome://extensions/shortcuts에서 ⌘T 등 원하는 키로 변경할 수 있습니다. 명령 바, 새 탭, 전환기, 웹 클립에서 쓰는 모든 키와 백그라운드에서 열기 같은 클릭 동작도 정리했습니다.",
      keywords: ["Lumno 단축키", "크롬 확장 단축키 변경", "chrome://extensions/shortcuts", "Cmd T 명령 바", "백그라운드 탭에서 열기"],
      title: "단축키",
      navTitle: "단축키",
      faq: [
        {
          question: "단축키가 작동하지 않으면 어떻게 해야 하나요?",
          answer:
            "chrome:// 설정이나 웹 스토어 같은 제한된 페이지가 아닌지 먼저 확인하고, chrome://extensions/shortcuts에서 다른 확장 프로그램과 겹치지 않는지 확인하세요. Dia에서는 범위를 Global로 변경하세요.",
        },
      ],
    },
    sync: {
      pageTitle: "브라우저 동기화와 WebDAV로 여러 컴퓨터에서 Lumno 쓰기 | Lumno 도움말",
      pageDescription:
        "Lumno 설정은 브라우저 동기화를 따라 함께 옮겨 갑니다. 직접 올린 아이콘, 배경화면, 문구 모음까지 옮기려면 WebDAV 동기화를 켜세요. Nextcloud, NAS 등 직접 관리하는 WebDAV 서버를 사용할 수 있습니다.",
      keywords: ["Lumno 동기화", "WebDAV 동기화", "Nextcloud WebDAV", "크롬 확장 설정 동기화", "새 탭 동기화"],
      title: "동기화",
      navTitle: "동기화",
      faq: [
        {
          question: "동기화하려면 Lumno 계정이 있어야 하나요?",
          answer: "아니요. Lumno에는 계정도 서버도 없습니다. 설정은 브라우저 동기화로, 아이콘과 배경화면은 직접 준비한 WebDAV로 동기화합니다.",
        },
        {
          question: "Chrome과 Firefox끼리도 동기화되나요?",
          answer: "네, WebDAV를 사용하면 가능합니다. 두 브라우저에 같은 서버와 폴더를 지정하면 같은 컴퓨터에서도 동기화됩니다.",
        },
      ],
    },
    "search-tabs-bookmarks-history": {
      pageTitle: "열린 탭, 북마크, 방문 기록을 검색창 하나로 찾기 | Lumno 도움말",
      pageDescription:
        "어떤 페이지에서든 ⌘⇧K(Windows는 Ctrl+Shift+K)를 누르면 열린 탭, 북마크, 방문 기록, 자주 가는 사이트를 한 번에 검색할 수 있고, 열린 탭만 검색할 수도 있습니다.",
      keywords: ["크롬 탭 검색", "북마크 검색 확장", "방문 기록 검색", "열린 탭 찾기", "크롬 명령 팔레트"],
      title: "탭, 북마크, 방문 기록 검색",
      navTitle: "탭·북마크·기록 검색",
      faq: [
        {
          question: "방문 기록이나 북마크가 업로드되나요?",
          answer:
            "아니요. 탭, 북마크, 방문 기록은 기기 안에서만 검색하고 Lumno는 이를 수집하지 않습니다. 입력한 내용은 추천 검색어를 보여 주기 위해 검색 엔진의 추천 서비스로 전송되는데, 주소창에 입력할 때와 같습니다.",
        },
        {
          question: "결과를 새 탭에서 열 수 있나요?",
          answer: "네. Lumno 설정에서 현재 탭, 현재 탭의 왼쪽 또는 오른쪽, 탭 줄의 맨 끝 중 결과를 열 위치를 선택할 수 있습니다.",
        },
      ],
    },
    "site-search": {
      pageTitle: "사이트 검색: 단축어 입력 후 Tab으로 GitHub, YouTube, ChatGPT 바로 검색 | Lumno 도움말",
      pageDescription:
        "Lumno에는 47개의 검색 단축어가 기본으로 포함되어 있습니다. gh, yt, sf를 입력하고 Tab을 누르면 GitHub, YouTube, Stack Overflow를 바로 검색하고, ChatGPT, Gemini, Perplexity에도 질문을 곧장 보낼 수 있습니다.",
      keywords: ["크롬 사이트 검색", "Tab 검색", "브라우저 검색 단축어", "GitHub 빠르게 검색", "ChatGPT 바로 질문", "맞춤 검색 엔진"],
      title: "사이트 검색과 AI에게 질문하기",
      navTitle: "사이트 검색·AI 질문",
      faq: [
        {
          question: "어떤 사이트가 기본으로 들어 있나요?",
          answer:
            "모두 47개입니다. 검색 엔진 11개, ChatGPT, Gemini, Perplexity, DeepSeek 같은 AI 채팅과 AI 검색 11개, GitHub, YouTube, Stack Overflow, Reddit 등 사이트 24개, 그리고 Lumno 도움말 센터가 포함되어 있으며, 직접 추가할 수도 있습니다.",
        },
        { question: "사이트 검색이 Lumno 서버를 거치나요?", answer: "아니요. Lumno에는 서버가 없습니다. Return 키를 누르면 해당 사이트의 검색 페이지가 바로 열립니다." },
      ],
    },
    "tab-switcher": {
      pageTitle: "최근 탭 전환기: ⌥Q로 최근 탭 사이를 오가기 | Lumno 도움말",
      pageDescription:
        "⌥Q(Windows는 Alt+Q)를 누르면 Lumno의 최근 탭 전환기가 열리고, 사용한 순서대로 탭이 미리보기와 함께 표시됩니다. ⌥를 누른 채 Q를 반복해서 눌러 선택하고, ⌥에서 손을 떼면 전환됩니다. 전환기에서 바로 탭을 닫을 수도 있습니다.",
      keywords: ["크롬 탭 전환", "최근 탭", "브라우저 Alt Tab", "Arc Ctrl Tab"],
      title: "최근 탭 사이 전환",
      navTitle: "최근 탭 전환",
    },
    "newtab-wallpaper": {
      pageTitle: "새 탭 배경화면: 명화, Bing 오늘의 사진, 내 사진과 필터 | Lumno 도움말",
      pageDescription:
        "Appearance 설정에서 Lumno 새 탭의 배경화면을 바꾸세요. 기본 명화, Bing 오늘의 사진, 엄선한 사진, 내 이미지나 이미지 링크를 쓸 수 있고, 마스크와 필터, 라이트·다크 모드별 배경화면도 설정할 수 있습니다. 검색창과 카드에 Acrylic나 Liquid glass 재질을 입힐 수도 있습니다.",
      keywords: ["새 탭 배경화면", "크롬 새 탭 배경", "Bing 오늘의 배경화면", "새 탭 확장 프로그램"],
      title: "배경화면 바꾸기",
      navTitle: "배경화면 바꾸기",
    },
    "newtab-bookmarks-shortcuts": {
      pageTitle: "새 탭 바로가기와 북마크: 사이트 추가와 그룹, 북마크 레이아웃 세 가지 | Lumno 도움말",
      pageDescription:
        "자주 가는 사이트를 Lumno 새 탭에 바로가기로 추가하고 아이콘을 고르고 그룹이나 폴더로 묶어 보세요. 북마크는 폴더, 다단계 목록, 상단 바 중 원하는 방식으로 볼 수 있고, 표시할 줄 수를 바꾸거나 숨길 수도 있습니다.",
      keywords: ["새 탭 바로가기", "바로가기 그룹", "새 탭 북마크", "크롬 북마크바", "북마크 폴더", "새 탭 북마크 숨기기"],
      title: "바로가기와 북마크",
      navTitle: "바로가기와 북마크",
    },
    "newtab-frequent-sites": {
      pageTitle: "자주 가는 사이트와 진행 카드: 사이트 고정, 보던 회차 이어 보기 | Lumno 도움말",
      pageDescription:
        "Lumno 새 탭에는 자주 방문하거나 최근에 방문한 사이트가 표시됩니다. 최대 세 개까지 고정할 수 있으며, 드라마나 연재 소설을 고정하면 다음 화로 넘어갈 때 카드도 자동으로 업데이트됩니다. 카드는 한두 줄로 표시하거나 끌 수 있습니다.",
      keywords: ["새 탭 자주 가는 사이트", "드라마 진도 기록", "웹소설 진도", "사이트 고정", "새 탭 카드 숨기기"],
      title: "자주 가는 사이트와 진행 카드",
      navTitle: "자주 가는 사이트·진행 카드",
    },
    "newtab-clock-zen": {
      pageTitle: "시계, 오늘의 문구, Zen 모드: 검색창만 남긴 새 탭 | Lumno 도움말",
      pageDescription: "Lumno 새 탭에 시계와 내 TXT·Markdown 파일에서 고른 오늘의 문구를 표시하거나, /zen을 입력해 검색창만 남길 수 있습니다.",
      keywords: ["새 탭 시계", "새 탭 명언", "미니멀 새 탭", "Zen 모드", "집중 새 탭"],
      title: "시계, 문구, Zen 모드",
      navTitle: "시계·문구·Zen 모드",
    },
    "newtab-other-extensions": {
      pageTitle: "다른 새 탭 확장 프로그램과 함께 사용하기: Lumno 명령 바만 사용 | Lumno 도움말",
      pageDescription:
        "Momentum이나 Tabliss 같은 새 탭 확장 프로그램을 계속 사용하면서 Lumno의 명령 바만 사용하는 방법입니다. 다른 확장 프로그램을 Lumno보다 나중에 켜면 새 탭을 바꿉니다. 변경 사항 유지 여부를 물으면 유지를 선택하세요.",
      keywords: ["새 탭 확장 프로그램 충돌", "크롬 새 탭 확장 프로그램 변경", "Lumno 명령 바만 사용", "Momentum", "Tabliss"],
      title: "다른 새 탭 확장 프로그램과 함께 사용하기",
      navTitle: "다른 새 탭 확장과 함께 사용",
    },
    "selection-actions": {
      pageTitle: "텍스트 선택 빠른 작업: 선택한 텍스트를 AI로 설명, 번역, 요약하기 | Lumno 도움말",
      pageDescription:
        "웹 페이지에서 텍스트를 선택하면 Lumno가 내용에 따라 답변, 번역, 설명, 요약, 조사, 계산 등의 AI 작업을 표시합니다. 도움이 필요한지 기기에서 먼저 판단하므로 선택할 때마다 나타나지 않습니다.",
      keywords: ["텍스트 선택 AI", "선택 번역 확장 프로그램", "선택한 텍스트 설명", "크롬 선택 AI", "선택 요약"],
      title: "텍스트 선택 빠른 작업",
      navTitle: "텍스트 선택 빠른 작업",
    },
    "auto-pip": {
      pageTitle: "자동 PIP: 탭을 전환하면 동영상을 작은 창에서 계속 재생 | Lumno 도움말",
      pageDescription:
        "동영상을 재생하다가 다른 탭으로 이동하면 동영상이 자동으로 PIP 창에서 재생되고, 돌아오면 원래대로 돌아옵니다. 작동 조건, 제외되는 사이트, 켜고 끄는 방법을 안내합니다.",
      keywords: ["자동 PIP", "크롬 PIP 확장 프로그램", "탭 전환 동영상 작은 창", "Arc 자동 PIP", "동영상 플로팅 창"],
      title: "자동 PIP",
      navTitle: "자동 PIP",
    },
    "web-clip": {
      pageTitle: "웹 클립: 페이지 일부를 플로팅 창에 띄우기 | Lumno 도움말",
      pageDescription:
        "웹 클립을 사용하면 표, 코드, 차트 같은 페이지 일부를 플로팅 창에 띄워 탭을 전환해도 계속 볼 수 있습니다. 켜는 방법, 내용 선택, 창 사용법과 제한 사항을 설명합니다.",
      keywords: ["웹 클립", "문서 PIP", "플로팅 창 크롬 확장 프로그램", "웹 페이지 일부 띄우기", "PIP 요소"],
      title: "웹 클립",
      navTitle: "웹 클립",
    },
    "arc-command-bar": {
      pageTitle: "Arc에서 Chrome, Dia, Edge로: 명령 바와 단축키 그대로 | Lumno 도움말",
      pageDescription:
        "Arc에서 Chrome, Dia, Edge로 옮겼다면 Lumno로 Arc와 비슷한 명령 바를 사용할 수 있습니다. ⌘⇧K(또는 ⌘T)로 탭, 북마크, 방문 기록을 검색하고 ⌥Q로 최근 탭을 전환하세요. Arc 단축키 비교표도 포함되어 있습니다.",
      keywords: ["Arc 명령 바 대안", "Arc 브라우저 대안", "Arc에서 크롬으로", "Dia 명령 바", "Arc 단축키"],
      title: "Arc에서 옮겨 왔다면",
      navTitle: "Arc에서 옮겨 왔다면",
      faq: [
        {
          question: "Lumno는 Arc와 관련이 있나요?",
          answer: "아니요. Lumno는 Arc의 명령 바에서 영감을 받은 독립 오픈소스 프로젝트이며, Arc 및 The Browser Company와는 관련이 없습니다.",
        },
      ],
    },
    "browser-compatibility": {
      pageTitle: "브라우저 호환성: Chrome, Edge, Dia, Brave, Firefox, Safari | Lumno 도움말",
      pageDescription:
        "Lumno는 Chrome, Edge, Brave, Arc, Vivaldi 등 Chromium 기반 브라우저에서 모든 기능이 작동합니다. Dia에서는 새 탭을 쓸 수 없고, Firefox 버전은 Firefox 부가 기능에 등록되어 있지만 일부 기능이 빠져 있으며, Safari와 모바일 브라우저는 지원하지 않습니다.",
      keywords: ["Lumno 호환성", "Dia 확장 프로그램", "Edge 확장 프로그램", "Firefox 버전", "Chromium 확장"],
      title: "브라우저 호환성",
      navTitle: "브라우저 호환성",
    },
    "security-open-source": {
      pageTitle: "보안과 오픈소스: GPL-3.0 코드, 권한, Manifest V3 | Lumno 도움말",
      pageDescription:
        "Lumno는 GitHub에 GPL-3.0으로 공개된 오픈소스이며, 원격 코드 없이 Manifest V3로 개발되었습니다. 꼭 필요한 브라우저 권한만 요청합니다.",
      keywords: ["Lumno 오픈소스", "Lumno 보안", "크롬 확장 권한", "Manifest V3"],
      title: "보안과 오픈소스",
      navTitle: "보안과 오픈소스",
    },
    "ratings-reviews": {
      pageTitle: "평점과 소개 기사: Chrome 웹 스토어 리뷰와 언론 소개 | Lumno 도움말",
      pageDescription: "Chrome 웹 스토어에서 받은 Lumno의 평점과 리뷰, Firefox 부가 기능 리뷰 페이지, 그리고 Lumno를 소개한 기사를 정리했습니다.",
      keywords: ["Lumno 리뷰", "Lumno 평점", "크롬 명령 바 확장 리뷰"],
      title: "평점과 소개 기사",
      navTitle: "평점과 소개 기사",
    },
  },
};

export default content;
