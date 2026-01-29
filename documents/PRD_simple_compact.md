# PRD - Shadow Lord Slayer TRPG (3시간 MVP)

## 문서 정보
- **목표**: AI GM과 대화하는 텍스트 기반 TRPG 챗봇
- **개발 시간**: 3시간
- **작성일**: 2026년 1월 29일

---

## 1. 제품 개요

### 핵심 가치
- **즉시 플레이**: 로그인 없이 접속 즉시 게임 시작
- **AI 스토리텔링**: GPT-4o-mini가 GM 역할
- **자동 기록**: 모든 대화 Supabase 저장
- **간편 관리**: Supabase Dashboard에서 직접 조회

### MVP 범위
**포함**: 단일 페이지 채팅 인터페이스, AI GM(OpenAI API), 대화 자동 저장(Supabase), 세션 기반 관리, 반응형 UI

**제외**: 로그인/회원가입(→익명세션), 캐릭터선택UI(→프롬프트처리), 스탯/인벤토리UI(→AI텍스트관리), 스테이지시스템, 엔딩시스템, 플레이기록페이지(→Dashboard사용)

---

## 2. 사용자 시나리오

### 신규 사용자
1. 웹사이트 접속 → 2. 세션 ID 자동생성(localStorage 저장) → 3. AI GM 오프닝 메시지 표시 → 4. 사용자 행동 입력 → 5. AI GM 상황 묘사 → 6. 반복 진행 → 7. 대화 실시간 Supabase 저장 → 8. 관리자 Dashboard 조회

### 재방문 시나리오
같은 브라우저 접속 → localStorage에서 세션 ID 확인 → 이전 대화 불러오기(선택) 또는 새 게임

### 관리자 시나리오
Supabase Dashboard 접속 → conversations 테이블 선택 → 대화 기록 조회/필터링/분석

---

## 3. 기능 요구사항

### 3.1 채팅 인터페이스

**메시지 표시**
- GM/사용자 메시지 시각적 구분 (왼쪽 보라/오른쪽 회색)
- 새 메시지 시 자동 하단 스크롤
- 타임스탬프 표시 (HH:MM)
- 로딩 시 "GM이 생각 중..." 표시
- 마크다운 지원 (굵은 글씨, 기울임, 줄바꿈)

**입력 영역**
- 하단 고정 textarea
- Enter 전송, Shift+Enter 줄바꿈
- AI 대기 중 비활성화
- 최대 500자 제한, 빈 입력 방지

**헤더**
- 게임 제목 표시
- 새 게임 버튼 (확인 모달)

### 3.2 AI GM 시스템

**시스템 프롬프트 핵심**
```
당신은 "Shadow Lord Slayer" GM입니다.
- 배경: 그림자 아카데미 마법 학교, 어둠의 군주 부활 저지
- 분위기: 해리포터 + 다크 판타지
- 응답: 200-300자 내외, 2-3개 선택지 또는 자유 행동 유도
- 스탯: HP, MP, 용기, 지혜 (대화로 언급)
- 10-15턴 내 클라이맥스
- 한국어, 폭력/선정 내용 제외
```

**오프닝 메시지**
```
🏰 **그림자 아카데미에 오신 것을 환영합니다**

당신은 오늘 마법 학교에 입학한 신입생입니다.
어둠의 군주가 곧 부활할 것이며, 선택받은 자만이 막을 수 있습니다.
교장: "모든 학생은 대강당으로 모이시오!"

1. 🏃 서둘러 대강당으로 달려간다
2. 🔍 주변을 살피며 천천히 이동한다
3. 📚 도서관에 들러 정보를 찾아본다
```

**API 설정**
- 모델: gpt-4o-mini
- max_tokens: 500
- temperature: 0.8
- presence_penalty: 0.3
- frequency_penalty: 0.3
- 최근 20개 메시지만 전송 (토큰 절약)

### 3.3 데이터 저장 (Supabase)

**저장 시점**
- 사용자 메시지 전송 시
- AI 응답 수신 시
- 세션 시작 시 (오프닝)

**에러 처리**: 저장 실패 시 콘솔 로깅만, 사용자에게 미표시 (UX 우선)

### 3.4 세션 관리

**세션 ID 생성**
```typescript
function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem('trpg_session_id')
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    localStorage.setItem('trpg_session_id', sessionId)
  }
  return sessionId
}
```

**새 게임**: 확인 모달 → 새 세션 ID 생성 → 기존 ID 삭제 → 화면 초기화 → 오프닝 표시

---

## 4. 비기능 요구사항

### 성능
- 초기 로딩: 2초 이내
- AI 응답: 5초 이내
- 메시지 렌더링: 100개까지 버벅임 없음

### 호환성
- 브라우저: Chrome, Safari, Firefox, Edge (최신)
- 디바이스: 데스크톱, 태블릿, 모바일
- 화면: 최소 320px ~

### 보안
- API 키: 서버사이드(API Route)만 사용
- 입력 검증: 500자 제한
- XSS 방지: React 기본 이스케이핑

---

## 5. 기술 스택

### 프론트엔드
- Next.js 14.x (App Router)
- React 18.x
- TypeScript 5.x
- Tailwind CSS 3.x

### 백엔드/인프라
- Next.js API Routes (AI 호출 서버)
- Supabase (PostgreSQL)
- Vercel (호스팅)

### 외부 서비스
- OpenAI API (gpt-4o-mini, ~$0.01/게임)
- Supabase (무료 티어)
- Vercel (무료 티어)

---

## 6. 개발 계획 (총 3시간)

1. **프로젝트 셋업** (20분): Next.js 생성, Tailwind 설정, 폴더 구조
2. **Supabase 설정** (15분): 프로젝트 생성, 테이블 생성, 환경변수
3. **채팅 UI 구현** (50분): ChatContainer, MessageList, MessageItem, ChatInput
4. **API Route 구현** (30분): /api/chat 엔드포인트, OpenAI 연동
5. **Supabase 연동** (25분): 클라이언트 설정, 저장/조회 함수
6. **상태 관리 연결** (20분): 세션 관리, 메시지 상태, 로딩 상태
7. **스타일링** (15분): 다크 테마, 반응형 조정
8. **테스트 및 수정** (15분): 전체 플로우 테스트, 버그 수정
9. **배포** (10분): Vercel 배포, 환경변수 설정

### 체크리스트
- [ ] Next.js 14 프로젝트 생성
- [ ] Tailwind CSS 설정
- [ ] Supabase 프로젝트 + conversations 테이블 생성
- [ ] RLS 정책 설정 (익명 허용)
- [ ] ChatContainer, MessageList, MessageItem, ChatInput 구현
- [ ] LoadingIndicator, NewGameModal 구현
- [ ] /api/chat/route.ts 구현
- [ ] Supabase 클라이언트 설정 (lib/supabase.ts)
- [ ] 세션 ID 관리, 오프닝 메시지 자동 생성
- [ ] 반응형 테스트 (모바일)
- [ ] Vercel 배포

---

## 7. 환경 변수

```env
# .env.local
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 8. 예상 결과물

### 데스크톱 화면
```
┌────────────────────────────────────────────────┐
│  🏰 Shadow Lord Slayer              [새 게임]  │
├────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────┐ │
│  │ 🎭 GM                          10:30 AM  │ │
│  │ 그림자 아카데미에 오신 것을...             │ │
│  └──────────────────────────────────────────┘ │
│                  ┌────────────────────────┐   │
│                  │              나 👤     │   │
│                  │ 대강당으로 달려간다    │   │
│                  └────────────────────────┘   │
│  ⏳ GM이 생각 중...                           │
├────────────────────────────────────────────────┤
│  [당신의 행동을 입력하세요...         ] [전송]│
└────────────────────────────────────────────────┘
```

### Supabase Dashboard
| id | session_id | role | content | created_at |
|----|-----------|------|---------|------------|
| 1 | abc-123 | assistant | 그림자 아카데미에... | 2026-01-29 10:30:00 |
| 2 | abc-123 | user | 대강당으로 달려간다 | 2026-01-29 10:31:15 |

---

## 9. 향후 확장 가능성

| 우선순위 | 기능 | 예상 시간 |
|---------|------|----------|
| P1 | 이전 대화 불러오기 | 1시간 |
| P1 | 캐릭터 선택 UI | 2시간 |
| P2 | 스탯/인벤토리 사이드바 | 3시간 |
| P2 | 배경 이미지/음악 | 2시간 |
| P3 | 로그인/회원가입 | 4시간 |
| P3 | 플레이 기록 페이지 | 3시간 |

---

**Note**: 이 문서는 3시간 MVP 개발을 위한 최소 사양입니다. 복잡한 기능은 AI 프롬프트로 처리하고, 데이터 관리는 Supabase Dashboard를 활용합니다.
