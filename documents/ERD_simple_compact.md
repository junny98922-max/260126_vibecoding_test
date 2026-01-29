# ERD - Shadow Lord Slayer TRPG (3시간 MVP)

## 문서 정보
- **데이터베이스**: PostgreSQL (Supabase)
- **목표**: 3시간 MVP 개발
- **작성일**: 2026년 1월 29일

---

## 1. 데이터베이스 개요

### 설계 원칙
- **최소 테이블**: 단일 테이블로 모든 대화 기록 관리
- **로그인 없음**: 사용자 테이블 불필요, 세션 ID로 구분
- **단순 구조**: 복잡한 관계 없이 플랫한 구조
- **Dashboard 활용**: 별도 관리 UI 없이 Supabase Dashboard 사용

### 제외된 테이블 (원본 대비)
user_profiles, character_archetypes, game_sessions, character_stats, inventory_items, item_definitions, story_logs, ending_definitions → **모두 제외** (conversations로 통합 또는 AI 텍스트 처리)

---

## 2. conversations 테이블

### 스키마 정의

| 컬럼명 | 타입 | Null | 기본값 | 설명 |
|--------|------|------|--------|------|
| `id` | uuid | NO | gen_random_uuid() | Primary Key |
| `session_id` | text | NO | - | 브라우저 세션 식별자 (클라이언트 생성) |
| `role` | text | NO | - | 메시지 발신자 ('user' or 'assistant') |
| `content` | text | NO | - | 메시지 내용 (최대 10,000자) |
| `created_at` | timestamptz | NO | now() | 생성 시간 (UTC) |

### 제약조건
- PRIMARY KEY: `id`
- CHECK: `role IN ('user', 'assistant')`
- CHECK: `length(content) <= 10000`
- CHECK: `length(session_id) > 0`

### 인덱스
- `conversations_pkey`: PRIMARY KEY (id)
- `idx_conversations_session`: (session_id, created_at) - 세션별 시간순 조회
- `idx_conversations_created_at`: created_at DESC - 최신 메시지 조회

---

## 3. ERD 다이어그램

```
┌─────────────────────────────────────────────────────┐
│                   conversations                     │
├─────────────────────────────────────────────────────┤
│ PK │ id          │ uuid        │ NOT NULL │ uuid    │
├────┼─────────────┼─────────────┼──────────┼─────────┤
│    │ session_id  │ text        │ NOT NULL │         │
│    │ role        │ text        │ NOT NULL │ CHECK   │
│    │ content     │ text        │ NOT NULL │         │
│    │ created_at  │ timestamptz │ NOT NULL │ now()   │
└─────────────────────────────────────────────────────┘

인덱스:
  - PRIMARY KEY (id)
  - INDEX (session_id, created_at)
  - INDEX (created_at DESC)
```

---

## 4. SQL 스크립트

### 테이블 생성

```sql
-- conversations 테이블
CREATE TABLE conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    CONSTRAINT conversations_role_check
        CHECK (role IN ('user', 'assistant')),
    CONSTRAINT conversations_content_length_check
        CHECK (length(content) <= 10000),
    CONSTRAINT conversations_session_id_check
        CHECK (length(session_id) > 0)
);

-- 인덱스
CREATE INDEX idx_conversations_session
    ON conversations(session_id, created_at);

CREATE INDEX idx_conversations_created_at
    ON conversations(created_at DESC);

-- 코멘트
COMMENT ON TABLE conversations IS 'AI GM과의 대화 기록';
COMMENT ON COLUMN conversations.session_id IS '브라우저 세션 ID (클라이언트 생성)';
COMMENT ON COLUMN conversations.role IS 'user: 사용자, assistant: AI GM';
```

### RLS (Row Level Security)

```sql
-- RLS 활성화
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- INSERT 허용 (누구나 대화 저장)
CREATE POLICY "Allow anonymous insert"
ON conversations FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- SELECT 허용 (누구나 대화 조회)
CREATE POLICY "Allow anonymous select"
ON conversations FOR SELECT
TO anon, authenticated
USING (true);

-- UPDATE, DELETE 불가 (대화 보존)
```

---

## 5. 샘플 데이터

```sql
-- 테스트 데이터
INSERT INTO conversations (session_id, role, content, created_at) VALUES

-- 세션 1
('550e8400-e29b-41d4-a716-446655440001', 'assistant',
'🏰 **그림자 아카데미에 오신 것을 환영합니다**

당신은 마법 학교에 입학한 신입생입니다.
어둠의 군주가 곧 부활합니다...

1. 🏃 서둘러 대강당으로 달려간다
2. 🔍 주변을 살피며 천천히 이동한다',
'2026-01-29 10:00:00+09'),

('550e8400-e29b-41d4-a716-446655440001', 'user',
'대강당으로 달려간다',
'2026-01-29 10:01:15+09');
```

---

## 6. Supabase Dashboard 활용

### 자주 사용하는 쿼리

**전체 대화 조회 (최신순)**
```sql
SELECT * FROM conversations
ORDER BY created_at DESC LIMIT 100;
```

**특정 세션 대화**
```sql
SELECT * FROM conversations
WHERE session_id = '550e8400-e29b-41d4-a716-446655440001'
ORDER BY created_at ASC;
```

**세션별 통계**
```sql
SELECT
    session_id,
    COUNT(*) as total_messages,
    COUNT(CASE WHEN role = 'user' THEN 1 END) as user_messages,
    COUNT(CASE WHEN role = 'assistant' THEN 1 END) as gm_messages,
    MIN(created_at) as started_at,
    MAX(created_at) as last_activity,
    EXTRACT(EPOCH FROM (MAX(created_at) - MIN(created_at))) / 60 as duration_minutes
FROM conversations
GROUP BY session_id
ORDER BY last_activity DESC;
```

**오늘 생성된 세션**
```sql
SELECT COUNT(DISTINCT session_id) as today_sessions
FROM conversations
WHERE created_at >= CURRENT_DATE;
```

**특정 키워드 검색**
```sql
SELECT * FROM conversations
WHERE content ILIKE '%어둠의 군주%'
ORDER BY created_at DESC;
```

---

## 7. TypeScript 타입

```typescript
// types/index.ts
export interface Conversation {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface NewConversation {
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
}
```

---

## 8. Supabase 클라이언트 코드

### 클라이언트 설정
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 데이터 조작 함수
```typescript
// lib/conversations.ts
import { supabase } from './supabase';
import type { Conversation, NewConversation } from '@/types';

// 메시지 저장
export async function saveMessage(message: NewConversation): Promise<Conversation | null> {
  const { data, error } = await supabase
    .from('conversations')
    .insert(message)
    .select()
    .single();
  
  if (error) {
    console.error('Error saving message:', error);
    return null;
  }
  return data;
}

// 세션 대화 조회
export async function getSessionMessages(sessionId: string): Promise<Conversation[]> {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
  return data || [];
}

// 최근 N개 메시지 (API 호출용)
export async function getRecentMessages(sessionId: string, limit = 20): Promise<Conversation[]> {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching recent messages:', error);
    return [];
  }
  return (data || []).reverse(); // 시간순 정렬
}
```

---

## 9. 데이터 관리

### 데이터 백업
```sql
-- JSON 형식 전체 데이터
SELECT json_agg(conversations)
FROM conversations;
```

### 데이터 정리
```sql
-- 30일 이상 삭제
DELETE FROM conversations
WHERE created_at < NOW() - INTERVAL '30 days';
```

### 데이터 크기 추정
- 메시지 1개: 약 500 bytes
- 게임 1회 (20턴): 약 10 KB
- 일일 100게임: 약 1 MB
- 월간: 약 30 MB
- **Supabase 무료 티어 (500 MB)로 약 16개월 운영 가능**

---

## 10. 성능 최적화

### 인덱스 활용
```sql
-- 쿼리 실행 계획 확인
EXPLAIN ANALYZE
SELECT * FROM conversations
WHERE session_id = 'test-session'
ORDER BY created_at ASC;
```

### 쿼리 최적화
```typescript
// 나쁜 예
const all = await supabase.from('conversations').select('*');
const filtered = all.data?.filter(m => m.session_id === sessionId);

// 좋은 예
const { data } = await supabase
  .from('conversations')
  .select('*')
  .eq('session_id', sessionId);
```

---

## 11. 트러블슈팅

| 오류 | 원인 | 해결 |
|------|------|------|
| `permission denied` | RLS 미설정 | RLS 정책 추가 |
| `violates check constraint` | role 값 오류 | 'user' 또는 'assistant'만 사용 |
| `value too long` | content 초과 | 10,000자 제한 |
| `connection refused` | 환경변수 오류 | SUPABASE_URL, ANON_KEY 확인 |

---

## 12. 향후 확장

### 메타데이터 추가
```sql
ALTER TABLE conversations
ADD COLUMN metadata JSONB DEFAULT '{}';

-- 사용 예: AI 모델 정보, 토큰 수
UPDATE conversations
SET metadata = '{"model": "gpt-4o-mini", "tokens": 150}'
WHERE id = '...';
```

### 로그인 추가 시
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE conversations
ADD COLUMN user_id UUID REFERENCES users(id);
```

---

**Note**: 이 ERD는 3시간 MVP를 위한 최소 구조입니다. 단일 테이블로 모든 대화를 관리하며, Supabase Dashboard에서 직접 조회/분석합니다.
