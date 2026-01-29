# ERD - 간소화 버전 (3시간 MVP)
## Shadow Lord Slayer TRPG

---

## 문서 정보

| 항목 | 내용 |
|------|------|
| **문서 제목** | Shadow Lord Slayer TRPG - 간소화 ERD |
| **데이터베이스** | PostgreSQL (Supabase) |
| **목표 개발 시간** | 3시간 |
| **대상 독자** | 백엔드 개발자, DB 관리자 |
| **작성일** | 2026년 1월 29일 |

---

## 1. 데이터베이스 개요

### 1.1 설계 원칙

- **최소 테이블**: 단일 테이블로 모든 대화 기록 관리
- **로그인 없음**: 사용자 테이블 불필요, 세션 ID로 구분
- **단순 구조**: 복잡한 관계 없이 플랫한 구조
- **Supabase Dashboard 활용**: 별도 관리 UI 없이 대시보드에서 직접 조회

### 1.2 제외된 테이블 (원본 대비)

| 원본 테이블 | 제외 이유 |
|-------------|-----------|
| user_profiles | 로그인 기능 제외 |
| character_archetypes | 캐릭터 선택 UI 제외 (프롬프트로 처리) |
| game_sessions | conversations 테이블로 통합 |
| character_stats | AI가 텍스트로 관리 |
| inventory_items | AI가 텍스트로 관리 |
| item_definitions | 아이템 시스템 제외 |
| story_logs | conversations 테이블로 통합 |
| ending_definitions | 엔딩 시스템 제외 |

---

## 2. 테이블 설계

### 2.1 conversations 테이블

**목적**: 모든 대화 기록을 저장하는 단일 테이블

#### 2.1.1 스키마 정의

| 컬럼명 | 데이터 타입 | Null | 기본값 | 설명 |
|--------|------------|------|--------|------|
| `id` | uuid | NO | gen_random_uuid() | Primary Key, 자동 생성 UUID |
| `session_id` | text | NO | - | 브라우저 세션 식별자 (클라이언트에서 생성) |
| `role` | text | NO | - | 메시지 발신자 ('user' 또는 'assistant') |
| `content` | text | NO | - | 메시지 내용 (최대 10,000자) |
| `created_at` | timestamptz | NO | now() | 메시지 생성 시간 (UTC) |

#### 2.1.2 제약조건

| 제약조건 | 타입 | 설명 |
|----------|------|------|
| `conversations_pkey` | PRIMARY KEY | `id` 컬럼 |
| `conversations_role_check` | CHECK | `role IN ('user', 'assistant')` |
| `conversations_content_check` | CHECK | `length(content) <= 10000` |
| `conversations_session_id_check` | CHECK | `length(session_id) > 0` |

#### 2.1.3 인덱스

| 인덱스명 | 컬럼 | 타입 | 목적 |
|----------|------|------|------|
| `conversations_pkey` | id | PRIMARY KEY | 기본 조회 |
| `idx_conversations_session` | (session_id, created_at) | B-TREE | 세션별 시간순 조회 |
| `idx_conversations_created_at` | created_at DESC | B-TREE | 최신 메시지 조회 |

---

## 3. ERD 다이어그램

### 3.1 테이블 구조

```
┌─────────────────────────────────────────────────────────────┐
│                       conversations                          │
├─────────────────────────────────────────────────────────────┤
│ PK │ id            │ uuid         │ NOT NULL │ DEFAULT uuid │
├────┼───────────────┼──────────────┼──────────┼──────────────┤
│    │ session_id    │ text         │ NOT NULL │              │
│    │ role          │ text         │ NOT NULL │ CHECK(...)   │
│    │ content       │ text         │ NOT NULL │              │
│    │ created_at    │ timestamptz  │ NOT NULL │ DEFAULT now()│
└─────────────────────────────────────────────────────────────┘

인덱스:
  - PRIMARY KEY (id)
  - INDEX (session_id, created_at)
  - INDEX (created_at DESC)
```

### 3.2 데이터 관계

```
conversations (단일 테이블 - 관계 없음)
│
├── session_id 기준으로 논리적 그룹핑
│   ├── 세션 A의 대화들
│   ├── 세션 B의 대화들
│   └── 세션 C의 대화들
│
└── created_at 기준으로 시간순 정렬
```

---

## 4. SQL 스크립트

### 4.1 테이블 생성

```sql
-- =============================================
-- Shadow Lord Slayer TRPG - 간소화 스키마
-- Supabase (PostgreSQL)
-- =============================================

-- conversations 테이블 생성
CREATE TABLE conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    -- 제약조건
    CONSTRAINT conversations_role_check
        CHECK (role IN ('user', 'assistant')),
    CONSTRAINT conversations_content_length_check
        CHECK (length(content) <= 10000),
    CONSTRAINT conversations_session_id_check
        CHECK (length(session_id) > 0)
);

-- 인덱스 생성
CREATE INDEX idx_conversations_session
    ON conversations(session_id, created_at);

CREATE INDEX idx_conversations_created_at
    ON conversations(created_at DESC);

-- 테이블 코멘트
COMMENT ON TABLE conversations IS 'AI GM과의 대화 기록 저장';
COMMENT ON COLUMN conversations.id IS '메시지 고유 ID (UUID)';
COMMENT ON COLUMN conversations.session_id IS '브라우저 세션 ID (클라이언트에서 생성)';
COMMENT ON COLUMN conversations.role IS '메시지 발신자 (user: 사용자, assistant: AI GM)';
COMMENT ON COLUMN conversations.content IS '메시지 내용';
COMMENT ON COLUMN conversations.created_at IS '메시지 생성 시간 (UTC)';
```

### 4.2 RLS (Row Level Security) 설정

```sql
-- RLS 활성화
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- 익명 사용자 INSERT 허용 (누구나 대화 저장 가능)
CREATE POLICY "Allow anonymous insert"
ON conversations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 익명 사용자 SELECT 허용 (누구나 대화 조회 가능)
-- 주의: 실제 운영에서는 세션 ID 기반 제한 권장
CREATE POLICY "Allow anonymous select"
ON conversations
FOR SELECT
TO anon, authenticated
USING (true);

-- 참고: UPDATE, DELETE는 기본적으로 불가
-- 대화 기록은 수정/삭제 없이 보존
```

### 4.3 선택적: 세션 기반 접근 제한

운영 환경에서 보안 강화가 필요한 경우:

```sql
-- 더 엄격한 RLS 정책 (세션 ID 기반)
-- 클라이언트에서 헤더로 session_id 전달 시 사용

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Allow anonymous select" ON conversations;

-- 세션 기반 SELECT 정책
-- 참고: 실제 구현 시 RPC 함수나 서버사이드 처리 권장
CREATE POLICY "Allow session based select"
ON conversations
FOR SELECT
TO anon, authenticated
USING (
    -- 모든 조회 허용 (MVP에서는 단순하게)
    -- 또는 특정 조건 추가 가능
    true
);
```

---

## 5. 샘플 데이터

### 5.1 테스트 데이터 INSERT

```sql
-- 테스트용 샘플 데이터
INSERT INTO conversations (session_id, role, content, created_at) VALUES

-- 세션 1: 완료된 게임
('550e8400-e29b-41d4-a716-446655440001', 'assistant',
'🏰 **그림자 아카데미에 오신 것을 환영합니다**

당신은 오늘 마법 학교 ''그림자 아카데미''에 입학한 신입생입니다.
고대의 예언에 따르면, 어둠의 군주가 곧 부활할 것이며, 오직 선택받은 자만이 그를 막을 수 있다고 합니다.

갑자기 하늘이 어두워지고, 교장 선생님의 다급한 목소리가 울려 퍼집니다.
"모든 학생은 대강당으로 모이시오! 긴급 상황입니다!"

당신은 어떻게 하시겠습니까?

1. 🏃 서둘러 대강당으로 달려간다
2. 🔍 주변을 살피며 천천히 이동한다
3. 📚 먼저 도서관에 들러 정보를 찾아본다',
'2026-01-29 10:00:00+09'),

('550e8400-e29b-41d4-a716-446655440001', 'user',
'대강당으로 달려간다',
'2026-01-29 10:01:15+09'),

('550e8400-e29b-41d4-a716-446655440001', 'assistant',
'당신은 복도를 전력으로 달립니다. 다른 학생들도 불안한 표정으로 대강당 쪽으로 향하고 있습니다.

대강당에 도착하니, 이미 수백 명의 학생들이 웅성거리고 있습니다. 교장 선생님이 단상에 올라 손을 들어 조용히 하라고 신호를 보냅니다.

"학생 여러분, 침착하십시오. 방금 마법 감지 장치가 이상 징후를 포착했습니다. 어둠의 기운이... 학교 지하에서 감지되었습니다."

웅성거림이 더 커집니다. 옆에 서 있던 선배가 당신에게 속삭입니다.

"신입생, 너 용기 있어 보이는데... 나랑 같이 지하를 조사해보지 않을래?"

어떻게 하시겠습니까?

1. ⚔️ 선배와 함께 지하 조사에 동참한다
2. 🛡️ 교장 선생님의 지시를 기다린다
3. 🔮 마법으로 어둠의 기운을 감지해본다',
'2026-01-29 10:01:20+09'),

-- 세션 2: 진행 중인 게임
('550e8400-e29b-41d4-a716-446655440002', 'assistant',
'🏰 **그림자 아카데미에 오신 것을 환영합니다**

당신은 오늘 마법 학교에 입학한 신입생입니다...',
'2026-01-29 11:30:00+09'),

('550e8400-e29b-41d4-a716-446655440002', 'user',
'도서관에서 정보를 찾아본다',
'2026-01-29 11:31:00+09');
```

### 5.2 샘플 데이터 확인

```sql
-- 전체 데이터 조회
SELECT * FROM conversations ORDER BY created_at DESC;

-- 세션별 그룹핑
SELECT session_id, COUNT(*) as message_count, MIN(created_at) as started_at
FROM conversations
GROUP BY session_id
ORDER BY started_at DESC;
```

---

## 6. Supabase Dashboard 활용 가이드

### 6.1 테이블 조회 방법

1. **Supabase Dashboard 접속**: https://supabase.com/dashboard
2. **프로젝트 선택**
3. **왼쪽 메뉴 → Table Editor 클릭**
4. **conversations 테이블 선택**

### 6.2 자주 사용하는 쿼리

#### 6.2.1 전체 대화 조회 (최신순)

```sql
SELECT * FROM conversations
ORDER BY created_at DESC
LIMIT 100;
```

#### 6.2.2 특정 세션의 대화 조회

```sql
SELECT * FROM conversations
WHERE session_id = '550e8400-e29b-41d4-a716-446655440001'
ORDER BY created_at ASC;
```

#### 6.2.3 세션별 통계

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

#### 6.2.4 오늘 생성된 세션 수

```sql
SELECT COUNT(DISTINCT session_id) as today_sessions
FROM conversations
WHERE created_at >= CURRENT_DATE;
```

#### 6.2.5 시간대별 사용량

```sql
SELECT
    DATE_TRUNC('hour', created_at) as hour,
    COUNT(*) as message_count,
    COUNT(DISTINCT session_id) as unique_sessions
FROM conversations
WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY hour
ORDER BY hour DESC;
```

#### 6.2.6 가장 긴 대화 세션

```sql
SELECT
    session_id,
    COUNT(*) as message_count,
    EXTRACT(EPOCH FROM (MAX(created_at) - MIN(created_at))) / 60 as duration_minutes
FROM conversations
GROUP BY session_id
ORDER BY message_count DESC
LIMIT 10;
```

#### 6.2.7 특정 키워드 검색

```sql
SELECT * FROM conversations
WHERE content ILIKE '%어둠의 군주%'
ORDER BY created_at DESC;
```

### 6.3 Dashboard 필터 활용

Supabase Table Editor에서 GUI로 필터링:

| 필터 조건 | 설정 방법 |
|-----------|-----------|
| 특정 세션만 보기 | `session_id` = `[세션ID]` |
| GM 메시지만 보기 | `role` = `assistant` |
| 오늘 데이터만 보기 | `created_at` > `2026-01-29` |
| 최근 100개만 | Rows per page = 100, Sort by created_at DESC |

---

## 7. TypeScript 타입 정의

### 7.1 기본 타입

```typescript
// types/index.ts

/**
 * 대화 메시지 타입
 */
export interface Conversation {
  id: string;           // UUID
  session_id: string;   // 세션 식별자
  role: 'user' | 'assistant';  // 메시지 발신자
  content: string;      // 메시지 내용
  created_at: string;   // ISO 8601 형식 (예: "2026-01-29T10:00:00+09:00")
}

/**
 * 새 메시지 생성용 타입 (id, created_at 제외)
 */
export interface NewConversation {
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
}

/**
 * 메시지 역할 타입
 */
export type MessageRole = 'user' | 'assistant';

/**
 * 세션 통계 타입
 */
export interface SessionStats {
  session_id: string;
  total_messages: number;
  user_messages: number;
  gm_messages: number;
  started_at: string;
  last_activity: string;
  duration_minutes: number;
}
```

### 7.2 Supabase 타입 (자동 생성)

```typescript
// types/supabase.ts

export type Database = {
  public: {
    Tables: {
      conversations: {
        Row: {
          id: string;
          session_id: string;
          role: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          role: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          role?: string;
          content?: string;
          created_at?: string;
        };
      };
    };
  };
};
```

---

## 8. Supabase 클라이언트 코드

### 8.1 클라이언트 설정

```typescript
// lib/supabase.ts

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

### 8.2 데이터 조작 함수

```typescript
// lib/conversations.ts

import { supabase } from './supabase';
import type { Conversation, NewConversation } from '@/types';

/**
 * 새 메시지 저장
 */
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

/**
 * 세션의 모든 대화 조회
 */
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

/**
 * 세션의 최근 N개 메시지 조회 (API 호출용)
 */
export async function getRecentMessages(sessionId: string, limit: number = 20): Promise<Conversation[]> {
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

  // 시간순 정렬 (오래된 순)
  return (data || []).reverse();
}

/**
 * 사용자 메시지와 AI 응답 한 쌍 저장
 */
export async function saveConversationPair(
  sessionId: string,
  userMessage: string,
  assistantMessage: string
): Promise<boolean> {
  const messages: NewConversation[] = [
    { session_id: sessionId, role: 'user', content: userMessage },
    { session_id: sessionId, role: 'assistant', content: assistantMessage }
  ];

  const { error } = await supabase
    .from('conversations')
    .insert(messages);

  if (error) {
    console.error('Error saving conversation pair:', error);
    return false;
  }

  return true;
}

/**
 * 세션 존재 여부 확인
 */
export async function sessionExists(sessionId: string): Promise<boolean> {
  const { count, error } = await supabase
    .from('conversations')
    .select('*', { count: 'exact', head: true })
    .eq('session_id', sessionId);

  if (error) {
    console.error('Error checking session:', error);
    return false;
  }

  return (count || 0) > 0;
}
```

### 8.3 사용 예시

```typescript
// 컴포넌트에서 사용
import { saveMessage, getSessionMessages } from '@/lib/conversations';

// 메시지 저장
await saveMessage({
  session_id: 'abc-123-xyz',
  role: 'user',
  content: '대강당으로 달려간다'
});

// 세션 대화 조회
const messages = await getSessionMessages('abc-123-xyz');
```

---

## 9. 데이터 관리 가이드

### 9.1 데이터 백업

Supabase Dashboard에서 수동 백업:

1. **SQL Editor** 접속
2. 아래 쿼리로 데이터 추출:

```sql
-- JSON 형식으로 전체 데이터 내보내기
SELECT json_agg(conversations)
FROM conversations;
```

3. 결과를 복사하여 JSON 파일로 저장

### 9.2 데이터 정리

오래된 데이터 삭제 (선택적):

```sql
-- 30일 이상 된 데이터 삭제
DELETE FROM conversations
WHERE created_at < NOW() - INTERVAL '30 days';

-- 특정 세션 삭제
DELETE FROM conversations
WHERE session_id = '삭제할-세션-id';
```

### 9.3 데이터 크기 추정

| 항목 | 예상 크기 |
|------|-----------|
| 메시지 1개 | 약 500 bytes (평균) |
| 게임 1회 (20턴) | 약 10 KB |
| 일일 100게임 | 약 1 MB |
| 월간 | 약 30 MB |
| Supabase 무료 티어 | 500 MB |

**결론**: 무료 티어로 약 16개월 운영 가능 (정리 없이)

---

## 10. 성능 최적화

### 10.1 인덱스 활용

```sql
-- 세션별 조회가 가장 빈번하므로 복합 인덱스 중요
-- 이미 생성됨: idx_conversations_session (session_id, created_at)

-- 쿼리 실행 계획 확인
EXPLAIN ANALYZE
SELECT * FROM conversations
WHERE session_id = 'test-session'
ORDER BY created_at ASC;
```

### 10.2 쿼리 최적화

```typescript
// 나쁜 예: 전체 조회 후 필터링
const all = await supabase.from('conversations').select('*');
const filtered = all.data?.filter(m => m.session_id === sessionId);

// 좋은 예: DB에서 필터링
const { data } = await supabase
  .from('conversations')
  .select('*')
  .eq('session_id', sessionId);
```

### 10.3 페이지네이션

대량 데이터 조회 시:

```typescript
// 페이지네이션 적용
const PAGE_SIZE = 50;

async function getMessagesPaginated(sessionId: string, page: number) {
  const { data } = await supabase
    .from('conversations')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true })
    .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

  return data;
}
```

---

## 11. 트러블슈팅

### 11.1 자주 발생하는 오류

| 오류 | 원인 | 해결 방법 |
|------|------|-----------|
| `permission denied` | RLS 정책 미설정 | RLS 정책 추가 또는 비활성화 |
| `violates check constraint` | role 값 오류 | 'user' 또는 'assistant'만 사용 |
| `value too long` | content 길이 초과 | 10,000자 이내로 제한 |
| `connection refused` | 환경변수 오류 | SUPABASE_URL, ANON_KEY 확인 |

### 11.2 디버깅 쿼리

```sql
-- 최근 오류 확인 (Supabase Logs)
-- Dashboard > Logs > Postgres logs

-- 테이블 상태 확인
SELECT
  relname as table_name,
  n_live_tup as row_count,
  pg_size_pretty(pg_total_relation_size(relid)) as total_size
FROM pg_stat_user_tables
WHERE relname = 'conversations';

-- 인덱스 사용 현황
SELECT
  indexrelname as index_name,
  idx_scan as times_used,
  pg_size_pretty(pg_relation_size(indexrelid)) as index_size
FROM pg_stat_user_indexes
WHERE relname = 'conversations';
```

---

## 12. 향후 확장 가능성

### 12.1 테이블 확장

MVP 이후 추가 가능한 컬럼:

```sql
-- 메타데이터 추가
ALTER TABLE conversations
ADD COLUMN metadata JSONB DEFAULT '{}';

-- 사용 예: AI 모델 정보, 토큰 수 등
UPDATE conversations
SET metadata = '{"model": "gpt-4o-mini", "tokens": 150}'
WHERE id = '...';
```

### 12.2 새 테이블 추가

로그인 기능 추가 시:

```sql
-- 사용자 테이블
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- conversations에 user_id 추가
ALTER TABLE conversations
ADD COLUMN user_id UUID REFERENCES users(id);
```

### 12.3 분석 뷰 추가

```sql
-- 세션 통계 뷰
CREATE VIEW session_stats AS
SELECT
  session_id,
  COUNT(*) as total_messages,
  MIN(created_at) as started_at,
  MAX(created_at) as ended_at,
  EXTRACT(EPOCH FROM (MAX(created_at) - MIN(created_at))) / 60 as duration_minutes
FROM conversations
GROUP BY session_id;

-- 사용 예
SELECT * FROM session_stats ORDER BY started_at DESC LIMIT 10;
```

---

**Note**: 이 ERD 문서는 3시간 MVP 개발을 위한 최소 데이터베이스 구조입니다. 단일 테이블로 모든 대화를 관리하며, Supabase Dashboard에서 직접 데이터를 조회/분석합니다.
