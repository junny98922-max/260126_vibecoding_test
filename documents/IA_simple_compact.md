# IA (정보 구조) - Shadow Lord Slayer TRPG (3시간 MVP)

## 문서 정보
- **목표**: 단일 페이지 채팅 인터페이스
- **개발 시간**: 3시간
- **대상**: 프론트엔드 개발자
- **작성일**: 2026년 1월 29일

---

## 1. 사이트 구조

### 사이트맵
```
/ (루트 - 메인 챗봇 페이지)
└── 단일 페이지 애플리케이션 (SPA)
```
**별도 라우팅 없음** - 모든 기능이 한 페이지에서 동작

### 제외된 페이지 (원본 대비)
/login, /signup, /app/hub, /app/game, /app/settings, /app/history → **모두 제외**

---

## 2. 페이지 레이아웃

### 전체 구조
```
┌─────────────────────────────────────┐
│            Header                   │
│  (타이틀, 새 게임 버튼)              │
├─────────────────────────────────────┤
│                                     │
│         Message Area                │
│      (채팅 메시지 목록)              │
│                                     │
├─────────────────────────────────────┤
│          Input Area                 │
│  (텍스트 입력창 + 전송 버튼)         │
└─────────────────────────────────────┘
```

### 데스크톱 (768px 이상)
- 전체 너비: 최대 800px, 중앙 정렬
- 헤더 높이: 60px
- 입력 영역: 80px
- 메시지 영역: 나머지 (flex-grow)
- 좌우 패딩: 24px

### 모바일 (768px 미만)
- 전체 너비: 100%
- 헤더 높이: 50px
- 입력 영역: 70px (키보드 고려)
- 좌우 패딩: 16px
- 메시지 버블: 최대 85%

---

## 3. 컴포넌트 구조

### 폴더 구조
```
src/
├── app/
│   ├── page.tsx              # 메인 (ChatContainer 렌더링)
│   ├── layout.tsx            # 루트 레이아웃
│   ├── globals.css           # Tailwind
│   └── api/chat/route.ts     # AI 챗봇 API
│
├── components/
│   ├── ChatContainer.tsx     # 전체 컨테이너
│   ├── ChatHeader.tsx        # 헤더
│   ├── MessageList.tsx       # 메시지 목록
│   ├── MessageItem.tsx       # 개별 메시지
│   ├── ChatInput.tsx         # 입력창
│   ├── LoadingIndicator.tsx  # 로딩 표시
│   └── NewGameModal.tsx      # 새 게임 모달
│
├── lib/
│   ├── supabase.ts           # Supabase 클라이언트
│   ├── openai.ts             # OpenAI 설정
│   └── utils.ts              # 유틸리티
│
├── hooks/
│   └── useChat.ts            # 채팅 상태 관리
│
└── types/
    └── index.ts              # 타입 정의
```

### 컴포넌트 계층
```
app/page.tsx
└── ChatContainer
    ├── ChatHeader
    │   └── NewGameButton → NewGameModal
    ├── MessageList
    │   ├── MessageItem (GM)
    │   ├── MessageItem (사용자)
    │   └── LoadingIndicator
    └── ChatInput
        ├── TextArea
        └── SendButton
```

---

## 4. 컴포넌트 상세

### ChatContainer.tsx
**역할**: 전체 채팅 UI 최상위 컨테이너

**내부 상태**:
```typescript
const [messages, setMessages] = useState<Message[]>([])
const [isLoading, setIsLoading] = useState(false)
const [sessionId, setSessionId] = useState<string>('')
const [showNewGameModal, setShowNewGameModal] = useState(false)
```

**스타일**:
```css
.chat-container {
  @apply flex flex-col h-screen max-w-3xl mx-auto bg-gray-900;
}
```

### ChatHeader.tsx
**역할**: 게임 타이틀 + 새 게임 버튼

**Props**:
```typescript
interface ChatHeaderProps {
  onNewGame: () => void
  sessionId?: string
}
```

**스타일**:
```css
.chat-header {
  @apply flex justify-between items-center px-6 py-4
         bg-gray-800 border-b border-gray-700;
}
.title { @apply text-xl font-bold text-purple-400; }
.new-game-button { @apply px-4 py-2 bg-purple-600 hover:bg-purple-700
                          text-white rounded-lg transition-colors; }
```

### MessageList.tsx
**역할**: 메시지 목록 스크롤 영역

**Props**:
```typescript
interface MessageListProps {
  messages: Message[]
  isLoading: boolean
}
```

**자동 스크롤**:
```typescript
const messagesEndRef = useRef<HTMLDivElement>(null)
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
}, [messages])
```

**스타일**:
```css
.message-list { @apply flex-1 overflow-y-auto px-4 py-6 space-y-4; }
```

### MessageItem.tsx
**역할**: 개별 메시지 버블

**Props**:
```typescript
interface MessageItemProps {
  message: Message
}
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: Date
}
```

**UI 분기**:
- `role === 'assistant'`: 왼쪽 정렬, 보라색, GM 아이콘
- `role === 'user'`: 오른쪽 정렬, 회색, 사용자 아이콘

**마크다운 지원**: `**굵게**`, `*기울임*`, 줄바꿈

**스타일**:
```css
/* GM */
.message-gm { @apply flex gap-3 max-w-[80%]; }
.message-gm-bubble {
  @apply bg-purple-900/50 border border-purple-700
         rounded-2xl rounded-tl-none px-4 py-3 text-gray-100;
}

/* 사용자 */
.message-user { @apply flex flex-row-reverse gap-3 max-w-[80%] ml-auto; }
.message-user-bubble {
  @apply bg-gray-700 border border-gray-600
         rounded-2xl rounded-tr-none px-4 py-3 text-gray-100;
}
```

### ChatInput.tsx
**역할**: 메시지 입력 + 전송

**Props**:
```typescript
interface ChatInputProps {
  onSend: (message: string) => void
  isLoading: boolean
}
```

**기능**:
- Enter: 전송, Shift+Enter: 줄바꿈
- 500자 제한, 빈 입력 방지
- 로딩 중 비활성화

**스타일**:
```css
.chat-input-container {
  @apply flex gap-2 px-4 py-4 bg-gray-800 border-t border-gray-700;
}
.chat-textarea {
  @apply flex-1 bg-gray-700 text-gray-100 rounded-lg px-4 py-3
         resize-none focus:outline-none focus:ring-2 focus:ring-purple-600;
}
.send-button {
  @apply px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600
         text-white rounded-lg transition-colors;
}
```

### LoadingIndicator.tsx
**역할**: AI 응답 대기 표시

**UI**:
```
🎭 GM
⏳ GM이 생각 중...
● ● ● (애니메이션)
```

**스타일**:
```css
.loading-indicator { @apply flex gap-3 max-w-[80%]; }
.loading-bubble {
  @apply bg-purple-900/30 border border-purple-700/50
         rounded-2xl rounded-tl-none px-4 py-3;
}
.loading-dot {
  @apply w-2 h-2 bg-purple-400 rounded-full animate-bounce;
}
```

### NewGameModal.tsx
**역할**: 새 게임 확인

**Props**:
```typescript
interface NewGameModalProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
}
```

---

## 5. 상태 관리

### useChat 커스텀 훅
```typescript
// hooks/useChat.ts
interface UseChatReturn {
  messages: Message[]
  isLoading: boolean
  sessionId: string
  sendMessage: (content: string) => Promise<void>
  startNewGame: () => void
}

function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState('')

  useEffect(() => {
    const id = getOrCreateSessionId()
    setSessionId(id)
    loadInitialMessage(id)
  }, [])

  const sendMessage = async (content: string) => {
    // 1. 사용자 메시지 추가 + Supabase 저장
    // 2. API 호출
    // 3. AI 응답 추가 + Supabase 저장
  }

  const startNewGame = () => {
    const newId = generateNewSessionId()
    setSessionId(newId)
    setMessages([])
    loadInitialMessage(newId)
  }

  return { messages, isLoading, sessionId, sendMessage, startNewGame }
}
```

### 상태 흐름
```
[페이지 로드] → [세션 ID 생성] → [오프닝 메시지]
     ↓
[사용자 입력] → [메시지 추가] → [Supabase 저장]
     ↓
[API 호출 (로딩 ON)] → [AI 응답] → [메시지 추가] → [Supabase 저장]
     ↓
[로딩 OFF] → [대기]
```

---

## 6. 데이터 흐름

```
ChatInput → useChat → API Route (/api/chat)
              ↓              ↓
          Supabase       OpenAI
           (저장)        (응답)
```

### API Route
```typescript
// app/api/chat/route.ts
export async function POST(request: Request) {
  const { sessionId, message, history } = await request.json()

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.slice(-20),
    { role: 'user', content: message }
  ]

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    max_tokens: 500,
    temperature: 0.8
  })

  return Response.json({
    reply: completion.choices[0].message.content
  })
}
```

---

## 7. 반응형 디자인

### 브레이크포인트
- **sm**: < 640px (모바일)
- **md**: 640~768px (태블릿)
- **lg**: > 768px (데스크톱)

### 반응형 변화

| 요소 | 모바일 | 데스크톱 |
|-----|-------|---------|
| 컨테이너 너비 | 100% | max-w-3xl |
| 패딩 | 16px | 24px |
| 헤더 높이 | 50px | 60px |
| 메시지 버블 | 최대 85% | 최대 80% |
| 폰트 크기 | 14px | 16px |

### Tailwind 예시
```tsx
<div className="flex flex-col h-screen w-full md:max-w-3xl md:mx-auto">
<div className="max-w-[85%] md:max-w-[80%]">
<textarea className="h-12 md:h-14 text-sm md:text-base">
```

---

## 8. 접근성

### 키보드
- Tab: 요소 간 이동
- Enter: 전송
- Shift+Enter: 줄바꿈
- Escape: 모달 닫기

### ARIA
```tsx
<div role="log" aria-live="polite" aria-label="대화 내용">
<div role="article" aria-label="GM의 메시지">
<textarea aria-label="메시지 입력">
<button aria-label="메시지 전송" disabled={isLoading}>
<div role="status" aria-label="GM이 응답 생성 중">
```

### 색상 대비
| 요소 | 전경색 | 배경색 | 대비율 |
|-----|-------|--------|--------|
| 본문 | #f3f4f6 | #111827 | 15.1:1 ✓ |
| GM | #f3f4f6 | #581c87/50 | 8.2:1 ✓ |
| 버튼 | #ffffff | #7c3aed | 4.6:1 ✓ |

---

## 9. 에러 처리

| 에러 | UI 표시 |
|-----|---------|
| API 실패 | "응답을 받지 못했습니다" + 재시도 버튼 |
| 네트워크 | "네트워크 연결 확인" 토스트 |
| 입력 검증 | 빨간 테두리 + "500자 이내" |

---

## 10. 성능 최적화

| 기법 | 적용 | 이유 |
|-----|------|------|
| React.memo | MessageItem | 이전 메시지 리렌더링 방지 |
| useCallback | sendMessage, startNewGame | 함수 참조 안정화 |
| useMemo | 메시지 필터링 | 재계산 방지 |

---

## 11. 테스트 체크리스트

### 기능
- [ ] 페이지 로드 시 세션 ID 생성
- [ ] 오프닝 메시지 자동 표시
- [ ] 메시지 입력/전송
- [ ] AI 응답 수신/표시
- [ ] 자동 스크롤
- [ ] 새 게임 버튼

### 반응형
- [ ] 데스크톱 (1920px)
- [ ] 태블릿 (768px)
- [ ] 모바일 (375px)

### 브라우저
- [ ] Chrome, Safari, Firefox, Edge (최신)
- [ ] iOS Safari, Android Chrome

---

**Note**: 이 IA는 3시간 MVP를 위한 단일 페이지 구조입니다. 복잡한 라우팅 없이 하나의 채팅 인터페이스에서 모든 기능이 동작합니다.
