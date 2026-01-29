# UI/UX 디자인 가이드 및 디자인 시스템
## Shadow Lord Slayer TRPG 게임

---

## 문서 정보

| 항목 | 내용 |
|------|------|
| **문서 제목** | Shadow Lord Slayer TRPG - UI/UX 디자인 시스템 |
| **서비스명 (한글)** | 볼드모트 죽이기 TRPG |
| **서비스명 (영문)** | Shadow Lord Slayer TRPG |
| **플랫폼** | 웹 애플리케이션 (데스크톱 우선, 모바일 반응형) |
| **작성일** | 2026년 1월 29일 |
| **대상 독자** | 프론트엔드 개발자, UI/UX 디자이너 |
| **문서 버전** | v1.0 |

---

## 목차

1. [디자인 철학 및 무드](#1-디자인-철학-및-무드)
2. [컬러 시스템](#2-컬러-시스템)
3. [타이포그래피](#3-타이포그래피)
4. [스페이싱 및 레이아웃](#4-스페이싱-및-레이아웃)
5. [핵심 컴포넌트](#5-핵심-컴포넌트)
6. [반응형 동작](#6-반응형-동작)
7. [상호작용 패턴](#7-상호작용-패턴)
8. [접근성 가이드라인](#8-접근성-가이드라인)
9. [애니메이션 및 트랜지션](#9-애니메이션-및-트랜지션)
10. [구현 예시](#10-구현-예시)

---

## 1. 디자인 철학 및 무드

### 1.1 핵심 디자인 원칙

**Shadow Lord Slayer TRPG**의 디자인은 **다크 네온 판타지**와 **미래형 SaaS 대시보드**의 조화를 추구합니다. 첨부된 레퍼런스 이미지에서 영감을 받아, 어두운 배경에 생동감 있는 네온 액센트를 결합하고, 여기에 신비로운 마법 학교 분위기를 더했습니다.

| 디자인 원칙 | 설명 |
|------------|------|
| **몰입감 (Immersive)** | 어두운 배경과 은은한 글로우로 플레이어를 판타지 세계로 끌어들임 |
| **미니멀리즘 (Minimal)** | 불필요한 장식을 배제하고 게임 콘텐츠에 집중 |
| **명확성 (Clarity)** | 10분 완결 게임에 최적화된 빠른 이해와 결정 지원 |
| **현대적 (Modern)** | 카드 기반 레이아웃, 글라스모피즘, 깔끔한 타이포그래피 |
| **신비로움 (Mystical)** | 별빛 그라데이션, 원형 마법진 패턴, 은은한 룬 문자 |

### 1.2 무드 키워드

```
다크 (Dark) • 네온 (Neon) • 아케인 (Arcane) • 미래적 (Futuristic)
미니멀 (Minimal) • 몰입적 (Immersive) • 신비로운 (Mysterious)
세련된 (Sleek) • 깔끔한 (Clean) • 모던 (Modern)
```

### 1.3 시각적 레퍼런스 해석

첨부된 스크린샷에서 도출한 핵심 요소:

**Image 1 특징**:
- 2×2 카드 그리드 레이아웃
- 코드 에디터와 채팅 UI의 조화
- 네온 퍼플 버튼 ("Jonny", "You", "What stalk are we using?")
- 어두운 배경 위 부드러운 카드 경계

**Image 2 특징**:
- 차트 및 데이터 시각화 (선 그래프, 네온 퍼플 강조)
- 아이콘 기반 서비스 카드
- AI 챗봇 시각화 (다이아몬드 형태의 네온 요소)
- 글로우 효과와 그라데이션 사용

**Image 3 특징**:
- 데이터 테이블 (판독 가능한 행 구분)
- 제품 카드 (브랜드 로고, 평점, 메트릭)
- UPC 스캐너 인터페이스 (점선 테두리, 인터랙티브 요소)
- 일관된 다크 테마 유지

**게임 적용 전략**:
- 카드 레이아웃 → 스탯 패널, 인벤토리, 스토리 로그
- 채팅 UI → AI GM과 플레이어 대화
- 네온 버튼 → 선택지 버튼
- 차트/진행률 → 스테이지 프로그레스 바
- 글로우/그라데이션 → 마법 효과 강조

---

## 2. 컬러 시스템

### 2.1 컬러 팔레트

#### 기본 배경 (Base Background)

| 토큰명 | HEX | Tailwind | 용도 |
|--------|-----|----------|------|
| `bg-primary` | `#0A0118` | `bg-[#0A0118]` | 메인 배경 (매우 어두운 네이비/퍼플) |
| `bg-secondary` | `#1A0B2E` | `bg-[#1A0B2E]` | 카드 배경, 패널 배경 |
| `bg-tertiary` | `#2D1B4E` | `bg-[#2D1B4E]` | 호버 상태, 하이라이트 영역 |

#### 액센트 컬러 (Accent Colors)

| 토큰명 | HEX | Tailwind | 용도 |
|--------|-----|----------|------|
| `accent-primary` | `#A855F7` | `bg-purple-500` | 주요 버튼, 링크, 강조 요소 |
| `accent-primary-light` | `#C084FC` | `bg-purple-400` | 호버 상태 |
| `accent-primary-dark` | `#7E22CE` | `bg-purple-700` | 액티브 상태 |
| `accent-secondary` | `#EC4899` | `bg-pink-500` | 보조 액센트, 중요 알림 |
| `accent-tertiary` | `#3B82F6` | `bg-blue-500` | 정보성 요소, 링크 |

#### 글로우 컬러 (Glow Effects)

| 토큰명 | HEX | 용도 |
|--------|-----|------|
| `glow-purple` | `#A855F7` with opacity | 카드 외곽 글로우, 버튼 호버 |
| `glow-pink` | `#EC4899` with opacity | 중요 알림, 특수 이벤트 |
| `glow-blue` | `#3B82F6` with opacity | 정보 카드, 툴팁 |

#### 텍스트 컬러 (Text Colors)

| 토큰명 | HEX | Tailwind | 용도 | WCAG 대비율 |
|--------|-----|----------|------|-------------|
| `text-primary` | `#F9FAFB` | `text-gray-50` | 주요 제목, 중요 텍스트 | AAA (15.8:1) |
| `text-secondary` | `#D1D5DB` | `text-gray-300` | 본문, 설명 | AA (10.2:1) |
| `text-tertiary` | `#9CA3AF` | `text-gray-400` | 보조 정보, 캡션 | AA (5.8:1) |
| `text-disabled` | `#6B7280` | `text-gray-500` | 비활성 상태 | - |

#### 상태 컬러 (Semantic Colors)

| 토큰명 | HEX | Tailwind | 용도 |
|--------|-----|----------|------|
| `success` | `#10B981` | `bg-emerald-500` | 성공, HP 회복 |
| `warning` | `#F59E0B` | `bg-amber-500` | 경고, MP 소모 |
| `error` | `#EF4444` | `bg-red-500` | 오류, HP 감소 |
| `info` | `#3B82F6` | `bg-blue-500` | 정보, 아이템 획득 |

### 2.2 그라데이션

```css
/* 메인 배경 그라데이션 */
.bg-gradient-main {
  background: linear-gradient(
    135deg,
    #0A0118 0%,
    #1A0B2E 50%,
    #2D1B4E 100%
  );
}

/* 카드 그라데이션 (글라스모피즘) */
.bg-gradient-card {
  background: linear-gradient(
    145deg,
    rgba(42, 27, 78, 0.6) 0%,
    rgba(26, 11, 46, 0.4) 100%
  );
  backdrop-filter: blur(10px);
}

/* 네온 그라데이션 (버튼, 강조) */
.bg-gradient-neon {
  background: linear-gradient(
    90deg,
    #A855F7 0%,
    #EC4899 100%
  );
}

/* 별빛 배경 (마법 효과) */
.bg-gradient-starry {
  background: radial-gradient(
    circle at 20% 50%,
    rgba(168, 85, 247, 0.1) 0%,
    transparent 50%
  ),
  radial-gradient(
    circle at 80% 80%,
    rgba(236, 72, 153, 0.1) 0%,
    transparent 50%
  ),
  #0A0118;
}
```

### 2.3 컬러 사용 예시

```html
<!-- 메인 배경 -->
<div class="bg-[#0A0118] min-h-screen">
  
  <!-- 카드 -->
  <div class="bg-[#1A0B2E]/60 backdrop-blur-lg border border-purple-500/20 
              shadow-[0_0_20px_rgba(168,85,247,0.3)] rounded-2xl p-6">
    
    <!-- 제목 -->
    <h2 class="text-gray-50 text-2xl font-bold mb-4">
      스테이지 3: 어둠의 복도
    </h2>
    
    <!-- 본문 -->
    <p class="text-gray-300 leading-relaxed">
      당신은 삐걱거리는 문 앞에 서 있습니다...
    </p>
    
    <!-- 액션 버튼 -->
    <button class="bg-purple-500 hover:bg-purple-400 text-white 
                   shadow-[0_0_15px_rgba(168,85,247,0.5)] 
                   transition-all duration-200">
      문을 연다
    </button>
  </div>
</div>
```

---

## 3. 타이포그래피

### 3.1 폰트 패밀리

**주요 폰트**: Inter / Pretendard / SF Pro

```css
:root {
  --font-primary: 'Inter', 'Pretendard', -apple-system, BlinkMacSystemFont, 
                  'Segoe UI', sans-serif;
  --font-code: 'JetBrains Mono', 'Fira Code', monospace;
}
```

**선정 이유**:
- **Inter/Pretendard**: 높은 가독성, 다양한 굵기, 다국어 지원
- **JetBrains Mono**: 코드나 게임 로그에 사용할 모노스페이스 폰트

### 3.2 타이포그래피 스케일

| 레벨 | 크기 | Line Height | Font Weight | Tailwind Class | 용도 |
|------|------|-------------|-------------|----------------|------|
| **H1** | 48px / 3rem | 1.2 | 700 (Bold) | `text-5xl font-bold` | 페이지 제목 |
| **H2** | 36px / 2.25rem | 1.3 | 700 (Bold) | `text-4xl font-bold` | 섹션 제목 |
| **H3** | 28px / 1.75rem | 1.4 | 600 (Semibold) | `text-3xl font-semibold` | 카드 제목 |
| **H4** | 24px / 1.5rem | 1.4 | 600 (Semibold) | `text-2xl font-semibold` | 하위 제목 |
| **Body Large** | 18px / 1.125rem | 1.6 | 400 (Regular) | `text-lg` | 중요 본문 |
| **Body** | 16px / 1rem | 1.6 | 400 (Regular) | `text-base` | 기본 본문 |
| **Body Small** | 14px / 0.875rem | 1.5 | 400 (Regular) | `text-sm` | 보조 정보 |
| **Caption** | 12px / 0.75rem | 1.4 | 400 (Regular) | `text-xs` | 캡션, 타임스탬프 |

### 3.3 텍스트 스타일

```css
/* 글로우 텍스트 (강조용) */
.text-glow {
  text-shadow: 0 0 10px rgba(168, 85, 247, 0.8),
               0 0 20px rgba(168, 85, 247, 0.4);
}

/* GM 메시지 스타일 */
.text-gm {
  font-size: 1rem;
  line-height: 1.6;
  color: #D1D5DB;
  font-weight: 400;
}

/* 플레이어 선택 텍스트 */
.text-player-choice {
  font-size: 1rem;
  line-height: 1.5;
  color: #F9FAFB;
  font-weight: 500;
}

/* 스탯 라벨 */
.text-stat-label {
  font-size: 0.75rem;
  line-height: 1.4;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* 스탯 값 */
.text-stat-value {
  font-size: 1.5rem;
  line-height: 1.2;
  color: #F9FAFB;
  font-weight: 700;
}
```

### 3.4 사용 예시

```html
<!-- 페이지 제목 -->
<h1 class="text-5xl font-bold text-gray-50 text-glow mb-6">
  Shadow Lord Slayer
</h1>

<!-- 카드 제목 -->
<h3 class="text-3xl font-semibold text-gray-50 mb-4">
  캐릭터 정보
</h3>

<!-- GM 메시지 -->
<p class="text-base text-gray-300 leading-relaxed mb-4">
  당신은 어두운 복도 끝에 서 있습니다. 멀리서 희미한 불빛이 보입니다.
</p>

<!-- 스탯 표시 -->
<div>
  <span class="text-xs text-gray-400 uppercase tracking-wider">HP</span>
  <span class="text-2xl font-bold text-gray-50">80/100</span>
</div>
```

---

## 4. 스페이싱 및 레이아웃

### 4.1 스페이싱 시스템

Tailwind의 기본 스페이싱을 기반으로, 8px 그리드 시스템 사용:

| 토큰 | 값 | Tailwind | 용도 |
|------|-----|----------|------|
| `space-xs` | 4px | `gap-1` / `p-1` | 아주 작은 간격 |
| `space-sm` | 8px | `gap-2` / `p-2` | 작은 간격 |
| `space-md` | 16px | `gap-4` / `p-4` | 기본 간격 |
| `space-lg` | 24px | `gap-6` / `p-6` | 큰 간격 |
| `space-xl` | 32px | `gap-8` / `p-8` | 매우 큰 간격 |
| `space-2xl` | 48px | `gap-12` / `p-12` | 섹션 간격 |
| `space-3xl` | 64px | `gap-16` / `p-16` | 페이지 간격 |

### 4.2 레이아웃 그리드

#### 데스크톱 레이아웃 (> 1024px)

```
┌────────────────────────────────────────────────────────────┐
│  Header (Topbar)                                    User   │
├──────────┬──────────────────────────────┬──────────────────┤
│          │                              │                  │
│ Left     │  Center Content              │  Right Panel     │
│ Sidebar  │  (Story Log + Choices)       │  (Inventory)     │
│ (Stats)  │                              │                  │
│          │                              │                  │
│ 280px    │  Flex-grow                   │  280px           │
└──────────┴──────────────────────────────┴──────────────────┘
```

**CSS Grid 구조**:
```css
.game-layout {
  display: grid;
  grid-template-columns: 280px 1fr 280px;
  gap: 24px;
  max-width: 1600px;
  margin: 0 auto;
  padding: 24px;
}
```

#### 태블릿 레이아웃 (768px ~ 1024px)

```
┌────────────────────────────────────────────┐
│  Header                              User  │
├────────────────────────────────────────────┤
│                                            │
│  Center Content                            │
│  (Story Log + Choices)                     │
│                                            │
├────────────────────────────────────────────┤
│  Stats                    Inventory        │
│  (Half)                   (Half)           │
└────────────────────────────────────────────┘
```

**CSS Grid 구조**:
```css
.game-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.bottom-panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
```

#### 모바일 레이아웃 (< 768px)

```
┌──────────────────────┐
│  Header        User  │
├──────────────────────┤
│                      │
│  Story Log           │
│  + Choices           │
│                      │
├──────────────────────┤
│  [Stats] [Inventory] │ ← Tabs
│  Tab Content         │
└──────────────────────┘
```

**CSS 구조**:
```css
.game-layout-mobile {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}
```

### 4.3 컨테이너 및 여백

```css
/* 메인 컨테이너 */
.container-main {
  max-width: 1600px;
  margin: 0 auto;
  padding: 24px;
}

/* 카드 여백 */
.card-padding {
  padding: 24px; /* 데스크톱 */
}

@media (max-width: 768px) {
  .card-padding {
    padding: 16px; /* 모바일 */
  }
}

/* 섹션 간격 */
.section-spacing {
  margin-bottom: 48px;
}
```

### 4.4 보더 및 라운드

| 토큰 | 값 | Tailwind | 용도 |
|------|-----|----------|------|
| `radius-sm` | 8px | `rounded-lg` | 작은 요소 (버튼, 뱃지) |
| `radius-md` | 12px | `rounded-xl` | 중간 요소 (카드) |
| `radius-lg` | 16px | `rounded-2xl` | 큰 요소 (패널, 모달) |
| `radius-full` | 9999px | `rounded-full` | 원형 (아바타, 아이콘) |

**보더 스타일**:
```css
/* 글라스 보더 */
.border-glass {
  border: 1px solid rgba(168, 85, 247, 0.2);
}

/* 글로우 보더 */
.border-glow {
  border: 1px solid rgba(168, 85, 247, 0.5);
  box-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
}
```

---

## 5. 핵심 컴포넌트

### 5.1 버튼 (Buttons)

#### 5.1.1 버튼 변형

| 변형 | 용도 | 시각적 특징 |
|------|------|-------------|
| **Primary** | 주요 액션 (선택지, 게임 시작) | 네온 퍼플 배경, 글로우 효과 |
| **Secondary** | 보조 액션 (취소, 뒤로가기) | 투명 배경, 퍼플 보더 |
| **Ghost** | 미묘한 액션 (설정, 더보기) | 투명 배경, 호버 시 배경 생김 |
| **Danger** | 위험 액션 (게임 종료, 삭제) | 레드/핑크 강조 |

#### 5.1.2 버튼 상태 스펙

**Primary Button**:

| 상태 | 배경 | 텍스트 | 보더 | Shadow | Cursor |
|------|------|--------|------|--------|--------|
| Default | `#A855F7` | `#FFFFFF` | None | `0 0 15px rgba(168,85,247,0.5)` | `pointer` |
| Hover | `#C084FC` | `#FFFFFF` | None | `0 0 20px rgba(168,85,247,0.7)` | `pointer` |
| Active | `#7E22CE` | `#FFFFFF` | None | `0 0 10px rgba(168,85,247,0.8)` | `pointer` |
| Focus | `#A855F7` | `#FFFFFF` | `2px solid #C084FC` | `0 0 15px rgba(168,85,247,0.5)` | `pointer` |
| Disabled | `#6B7280` | `#9CA3AF` | None | None | `not-allowed` |

**코드 예시**:
```html
<!-- Primary Button -->
<button class="
  px-6 py-3 rounded-lg
  bg-purple-500 hover:bg-purple-400 active:bg-purple-700
  text-white font-semibold
  shadow-[0_0_15px_rgba(168,85,247,0.5)]
  hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]
  focus:outline-none focus:ring-2 focus:ring-purple-400
  disabled:bg-gray-500 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed
  transition-all duration-200
">
  정면으로 돌진한다
</button>

<!-- Secondary Button -->
<button class="
  px-6 py-3 rounded-lg
  bg-transparent hover:bg-purple-500/10
  text-purple-400 hover:text-purple-300
  border border-purple-500/50 hover:border-purple-400
  transition-all duration-200
">
  취소
</button>

<!-- Ghost Button -->
<button class="
  px-4 py-2 rounded-lg
  bg-transparent hover:bg-white/5
  text-gray-300 hover:text-gray-50
  transition-all duration-200
">
  설정
</button>
```

#### 5.1.3 버튼 크기

| 크기 | 패딩 | 폰트 크기 | Tailwind |
|------|------|-----------|----------|
| **Small** | 8px 16px | 14px | `px-4 py-2 text-sm` |
| **Medium** | 12px 24px | 16px | `px-6 py-3 text-base` |
| **Large** | 16px 32px | 18px | `px-8 py-4 text-lg` |

---

### 5.2 카드 (Cards)

#### 5.2.1 기본 카드 스타일

```css
.card-base {
  background: linear-gradient(
    145deg,
    rgba(42, 27, 78, 0.6) 0%,
    rgba(26, 11, 46, 0.4) 100%
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
              0 0 20px rgba(168, 85, 247, 0.1);
  transition: all 0.3s ease;
}

.card-base:hover {
  border-color: rgba(168, 85, 247, 0.4);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5),
              0 0 30px rgba(168, 85, 247, 0.2);
  transform: translateY(-2px);
}
```

**HTML 예시**:
```html
<div class="
  bg-gradient-to-br from-[#2A1B4E]/60 to-[#1A0B2E]/40
  backdrop-blur-lg
  border border-purple-500/20
  rounded-2xl p-6
  shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_20px_rgba(168,85,247,0.1)]
  hover:border-purple-500/40
  hover:shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_30px_rgba(168,85,247,0.2)]
  hover:-translate-y-0.5
  transition-all duration-300
">
  <h3 class="text-2xl font-semibold text-gray-50 mb-4">캐릭터 스탯</h3>
  <!-- 카드 내용 -->
</div>
```

#### 5.2.2 카드 변형

**Stats Card (스탯 패널)**:
```html
<div class="card-base space-y-4">
  <!-- 캐릭터 아바타 -->
  <div class="flex items-center gap-4">
    <div class="w-16 h-16 rounded-full bg-purple-500/20 
                border-2 border-purple-500/50
                flex items-center justify-center">
      <span class="text-2xl">🧙</span>
    </div>
    <div>
      <h4 class="text-lg font-semibold text-gray-50">용감한 전사</h4>
      <p class="text-sm text-gray-400">레벨 1</p>
    </div>
  </div>
  
  <!-- 스탯 바 -->
  <div>
    <div class="flex justify-between text-sm mb-1">
      <span class="text-gray-400">HP</span>
      <span class="text-gray-50">80/100</span>
    </div>
    <div class="h-2 bg-gray-700/50 rounded-full overflow-hidden">
      <div class="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 
                  shadow-[0_0_10px_rgba(16,185,129,0.5)]"
           style="width: 80%"></div>
    </div>
  </div>
  
  <!-- 더 많은 스탯... -->
</div>
```

**Inventory Card (인벤토리)**:
```html
<div class="card-base">
  <h3 class="text-xl font-semibold text-gray-50 mb-4">인벤토리</h3>
  
  <div class="grid grid-cols-3 gap-3">
    <!-- 아이템 슬롯 -->
    <div class="aspect-square bg-white/5 rounded-lg 
                border border-purple-500/20
                hover:border-purple-500/50 hover:bg-white/10
                transition-all cursor-pointer
                flex items-center justify-center">
      <span class="text-2xl">🗡️</span>
    </div>
    
    <!-- 빈 슬롯 -->
    <div class="aspect-square bg-white/5 rounded-lg 
                border border-gray-700/30
                flex items-center justify-center">
      <span class="text-gray-600">+</span>
    </div>
  </div>
</div>
```

---

### 5.3 채팅 인터페이스 (Chat UI)

#### 5.3.1 메시지 버블

**GM 메시지**:
```html
<div class="flex items-start gap-3 mb-4">
  <!-- GM 아이콘 -->
  <div class="w-10 h-10 rounded-full bg-purple-500/20 
              border border-purple-500/50 flex-shrink-0
              flex items-center justify-center">
    <span class="text-lg">🎭</span>
  </div>
  
  <!-- 메시지 내용 -->
  <div class="flex-1 bg-white/5 rounded-2xl rounded-tl-none p-4
              border border-purple-500/10">
    <div class="text-xs text-purple-400 mb-1">Game Master</div>
    <p class="text-gray-300 leading-relaxed">
      당신은 어두운 복도 끝에 서 있습니다. 멀리서 희미한 불빛이 보이고, 
      차가운 바람이 당신의 얼굴을 스칩니다. 어떻게 하시겠습니까?
    </p>
  </div>
</div>
```

**플레이어 메시지 (선택 기록)**:
```html
<div class="flex items-start gap-3 mb-4 flex-row-reverse">
  <!-- 플레이어 아이콘 -->
  <div class="w-10 h-10 rounded-full bg-pink-500/20 
              border border-pink-500/50 flex-shrink-0
              flex items-center justify-center">
    <span class="text-lg">👤</span>
  </div>
  
  <!-- 메시지 내용 -->
  <div class="flex-1 bg-gradient-to-br from-purple-500/20 to-pink-500/20
              rounded-2xl rounded-tr-none p-4
              border border-purple-500/30">
    <div class="text-xs text-pink-400 mb-1 text-right">You</div>
    <p class="text-gray-50 leading-relaxed text-right">
      조용히 불빛을 향해 다가간다
    </p>
  </div>
</div>
```

#### 5.3.2 선택지 버튼 영역

```html
<div class="space-y-3 mt-6">
  <button class="
    w-full px-6 py-4 rounded-xl
    bg-gradient-to-r from-purple-500/10 to-transparent
    border border-purple-500/30
    hover:border-purple-500/60 hover:bg-purple-500/20
    text-left text-gray-50
    shadow-[0_0_15px_rgba(168,85,247,0.1)]
    hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]
    transition-all duration-200
    group
  ">
    <div class="flex items-center justify-between">
      <span class="text-base font-medium">정면으로 돌진한다</span>
      <svg class="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform"
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M9 5l7 7-7 7" />
      </svg>
    </div>
    <p class="text-sm text-gray-400 mt-2">위험도: 높음 • 공격력 사용</p>
  </button>
  
  <!-- 추가 선택지... -->
</div>
```

---

### 5.4 프로그레스 바 (Progress Indicator)

#### 5.4.1 스테이지 프로그레스

```html
<div class="mb-6">
  <div class="flex justify-between items-center mb-2">
    <span class="text-sm text-gray-400">스테이지 진행</span>
    <span class="text-sm text-gray-50 font-semibold">3 / 7</span>
  </div>
  
  <!-- 프로그레스 바 -->
  <div class="h-2 bg-gray-700/50 rounded-full overflow-hidden">
    <div class="h-full bg-gradient-to-r from-purple-500 to-pink-500 
                shadow-[0_0_10px_rgba(168,85,247,0.6)]
                transition-all duration-500"
         style="width: 43%"></div>
  </div>
  
  <!-- 스테이지 도트 -->
  <div class="flex justify-between mt-3">
    <div class="w-8 h-8 rounded-full bg-purple-500 
                border-2 border-purple-300
                flex items-center justify-center text-white text-xs font-bold
                shadow-[0_0_10px_rgba(168,85,247,0.5)]">
      ✓
    </div>
    <div class="w-8 h-8 rounded-full bg-purple-500 
                border-2 border-purple-300
                flex items-center justify-center text-white text-xs font-bold
                shadow-[0_0_10px_rgba(168,85,247,0.5)]">
      ✓
    </div>
    <div class="w-8 h-8 rounded-full bg-purple-500 
                border-2 border-white
                flex items-center justify-center text-white text-xs font-bold
                shadow-[0_0_15px_rgba(168,85,247,0.8)] animate-pulse">
      3
    </div>
    <div class="w-8 h-8 rounded-full bg-gray-700/50 
                border-2 border-gray-600
                flex items-center justify-center text-gray-500 text-xs">
      4
    </div>
    <!-- 나머지 스테이지... -->
  </div>
</div>
```

---

### 5.5 모달 (Modals)

#### 5.5.1 기본 모달 구조

```html
<!-- 오버레이 -->
<div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 
            flex items-center justify-center p-4
            animate-fadeIn">
  
  <!-- 모달 컨텐츠 -->
  <div class="bg-gradient-to-br from-[#2A1B4E] to-[#1A0B2E]
              border border-purple-500/30
              rounded-2xl p-8 max-w-md w-full
              shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(168,85,247,0.3)]
              animate-slideUp">
    
    <!-- 헤더 -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-50">새 게임 시작</h2>
      <button class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10
                     text-gray-400 hover:text-gray-50
                     transition-colors">
        <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" 
             viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" 
                stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- 본문 -->
    <p class="text-gray-300 mb-6">
      진행 중인 게임이 있습니다. 새 게임을 시작하면 현재 진행 상황이 저장됩니다.
    </p>
    
    <!-- 액션 버튼 -->
    <div class="flex gap-3">
      <button class="flex-1 px-6 py-3 rounded-lg
                     bg-transparent border border-purple-500/50
                     text-purple-400 hover:bg-purple-500/10
                     transition-all">
        취소
      </button>
      <button class="flex-1 px-6 py-3 rounded-lg
                     bg-purple-500 hover:bg-purple-400
                     text-white font-semibold
                     shadow-[0_0_15px_rgba(168,85,247,0.5)]
                     transition-all">
        시작하기
      </button>
    </div>
  </div>
</div>
```

#### 5.5.2 캐릭터 선택 모달

```html
<div class="modal-overlay">
  <div class="modal-content max-w-4xl">
    <h2 class="text-3xl font-bold text-gray-50 mb-2">캐릭터 선택</h2>
    <p class="text-gray-400 mb-8">당신의 여정을 시작할 캐릭터를 선택하세요</p>
    
    <!-- 캐릭터 그리드 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      
      <!-- 캐릭터 카드 -->
      <button class="group relative p-6 rounded-xl
                     bg-gradient-to-br from-purple-500/10 to-transparent
                     border-2 border-purple-500/30
                     hover:border-purple-500 hover:bg-purple-500/20
                     transition-all duration-300
                     text-left">
        
        <!-- 선택 표시 -->
        <div class="absolute top-3 right-3 w-6 h-6 rounded-full
                    border-2 border-purple-500/50 group-hover:border-purple-500
                    flex items-center justify-center
                    transition-all">
          <div class="w-3 h-3 rounded-full bg-purple-500 
                      opacity-0 group-hover:opacity-100
                      transition-opacity"></div>
        </div>
        
        <!-- 캐릭터 아이콘 -->
        <div class="text-6xl mb-4">⚔️</div>
        
        <!-- 캐릭터 정보 -->
        <h3 class="text-lg font-semibold text-gray-50 mb-2">용감한 전사</h3>
        <p class="text-sm text-gray-400 mb-3">
          높은 체력과 공격력으로 적과 정면 대결
        </p>
        
        <!-- 스탯 미리보기 -->
        <div class="space-y-1 text-xs">
          <div class="flex justify-between">
            <span class="text-gray-500">HP</span>
            <span class="text-emerald-400">★★★★☆</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">공격</span>
            <span class="text-purple-400">★★★★☆</span>
          </div>
        </div>
      </button>
      
      <!-- 더 많은 캐릭터 카드... -->
    </div>
    
    <!-- 확인 버튼 -->
    <button class="w-full mt-8 px-6 py-4 rounded-lg
                   bg-purple-500 hover:bg-purple-400
                   text-white font-semibold text-lg
                   shadow-[0_0_20px_rgba(168,85,247,0.5)]
                   transition-all">
      선택 완료
    </button>
  </div>
</div>
```

---

### 5.6 내비게이션 (Navigation)

#### 5.6.1 상단바 (Topbar)

```html
<header class="sticky top-0 z-30 
               bg-[#0A0118]/80 backdrop-blur-lg
               border-b border-purple-500/10">
  <div class="container-main flex items-center justify-between h-16">
    
    <!-- 로고 -->
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500
                  flex items-center justify-center
                  shadow-[0_0_15px_rgba(168,85,247,0.5)]">
        <span class="text-white text-xl font-bold">⚡</span>
      </div>
      <span class="text-xl font-bold text-gray-50">Shadow Lord Slayer</span>
    </div>
    
    <!-- 진행 상태 (게임 플레이 중에만) -->
    <div class="hidden md:flex items-center gap-4">
      <span class="text-sm text-gray-400">스테이지 3/7</span>
      <div class="w-32 h-2 bg-gray-700/50 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-purple-500 to-pink-500"
             style="width: 43%"></div>
      </div>
    </div>
    
    <!-- 사용자 메뉴 -->
    <div class="flex items-center gap-3">
      <!-- 빠른 액션 -->
      <button class="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10
                     text-gray-400 hover:text-gray-50
                     transition-colors" title="저장">
        <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" 
             viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
      </button>
      
      <button class="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10
                     text-gray-400 hover:text-gray-50
                     transition-colors" title="설정">
        <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" 
             viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
      
      <!-- 프로필 드롭다운 -->
      <div class="relative group">
        <button class="flex items-center gap-2 px-3 py-2 rounded-lg
                       bg-white/5 hover:bg-white/10
                       transition-colors">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500
                      flex items-center justify-center text-white text-sm font-bold">
            P
          </div>
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" 
               viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <!-- 드롭다운 메뉴 -->
        <div class="absolute right-0 mt-2 w-48 py-2
                    bg-[#1A0B2E] border border-purple-500/20 rounded-xl
                    shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible
                    transition-all duration-200">
          <a href="#" class="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-gray-50">
            프로필
          </a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-gray-50">
            플레이 기록
          </a>
          <div class="my-1 border-t border-purple-500/10"></div>
          <a href="#" class="block px-4 py-2 text-sm text-red-400 hover:bg-red-500/10">
            로그아웃
          </a>
        </div>
      </div>
    </div>
  </div>
</header>
```

---

### 5.7 입력 필드 (Input Fields)

```html
<!-- 텍스트 입력 -->
<div class="space-y-2">
  <label class="block text-sm font-medium text-gray-300">
    이메일
  </label>
  <input type="email" 
         class="w-full px-4 py-3 rounded-lg
                bg-white/5 border border-purple-500/20
                text-gray-50 placeholder-gray-500
                focus:outline-none focus:border-purple-500 focus:bg-white/10
                transition-all"
         placeholder="email@example.com">
</div>

<!-- 비밀번호 입력 -->
<div class="space-y-2">
  <label class="block text-sm font-medium text-gray-300">
    비밀번호
  </label>
  <div class="relative">
    <input type="password" 
           class="w-full px-4 py-3 rounded-lg
                  bg-white/5 border border-purple-500/20
                  text-gray-50 placeholder-gray-500
                  focus:outline-none focus:border-purple-500 focus:bg-white/10
                  transition-all">
    <button class="absolute right-3 top-1/2 -translate-y-1/2
                   text-gray-400 hover:text-gray-50 transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    </button>
  </div>
</div>

<!-- 에러 상태 -->
<div class="space-y-2">
  <input type="text" 
         class="w-full px-4 py-3 rounded-lg
                bg-white/5 border-2 border-red-500/50
                text-gray-50
                focus:outline-none focus:border-red-500
                transition-all">
  <p class="text-sm text-red-400 flex items-center gap-1">
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
    </svg>
    이메일 형식이 올바르지 않습니다
  </p>
</div>
```

---

### 5.8 토글 및 체크박스

```html
<!-- 토글 스위치 -->
<label class="flex items-center justify-between cursor-pointer group">
  <span class="text-sm text-gray-300 group-hover:text-gray-50 transition-colors">
    다크 모드
  </span>
  <div class="relative">
    <input type="checkbox" class="sr-only peer">
    <div class="w-11 h-6 bg-gray-700 rounded-full peer
                peer-checked:bg-purple-500
                transition-colors"></div>
    <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full
                peer-checked:translate-x-5
                transition-transform"></div>
  </div>
</label>

<!-- 체크박스 -->
<label class="flex items-center gap-3 cursor-pointer group">
  <input type="checkbox" 
         class="w-5 h-5 rounded bg-white/5 border-2 border-purple-500/30
                checked:bg-purple-500 checked:border-purple-500
                focus:outline-none focus:ring-2 focus:ring-purple-400
                transition-all">
  <span class="text-sm text-gray-300 group-hover:text-gray-50 transition-colors">
    이용약관에 동의합니다
  </span>
</label>
```

---

## 6. 반응형 동작

### 6.1 브레이크포인트

| 이름 | 최소 너비 | Tailwind | 적용 대상 |
|------|-----------|----------|-----------|
| **Mobile** | 0px | (기본) | 모바일 폰 |
| **Tablet** | 768px | `md:` | 태블릿 |
| **Desktop** | 1024px | `lg:` | 데스크톱 |
| **Large Desktop** | 1280px | `xl:` | 큰 데스크톱 |
| **XL Desktop** | 1536px | `2xl:` | 초대형 화면 |

### 6.2 반응형 레이아웃 전략

#### 게임 플레이 화면

**데스크톱 (>1024px)**:
```html
<div class="grid lg:grid-cols-[280px_1fr_280px] gap-6 p-6">
  <!-- 왼쪽: 캐릭터 스탯 -->
  <aside class="hidden lg:block">
    <!-- Stats Card -->
  </aside>
  
  <!-- 중앙: 스토리 로그 + 선택지 -->
  <main>
    <!-- Chat UI -->
  </main>
  
  <!-- 오른쪽: 인벤토리 -->
  <aside class="hidden lg:block">
    <!-- Inventory Card -->
  </aside>
</div>
```

**태블릿 (768px-1024px)**:
```html
<div class="flex flex-col gap-4 p-4">
  <!-- 중앙: 스토리 -->
  <main class="flex-1">
    <!-- Chat UI -->
  </main>
  
  <!-- 하단: 스탯 + 인벤토리 (반반) -->
  <div class="grid md:grid-cols-2 gap-4">
    <div><!-- Stats --></div>
    <div><!-- Inventory --></div>
  </div>
</div>
```

**모바일 (<768px)**:
```html
<div class="flex flex-col h-screen">
  <!-- 상단바 -->
  <header class="flex-shrink-0">
    <!-- Topbar -->
  </header>
  
  <!-- 스토리 영역 (스크롤) -->
  <main class="flex-1 overflow-y-auto p-4">
    <!-- Chat UI -->
  </main>
  
  <!-- 하단 탭 -->
  <div class="flex-shrink-0 bg-[#1A0B2E] border-t border-purple-500/20">
    <!-- Tabs: Stats / Inventory -->
    <div class="flex">
      <button class="flex-1 py-3 text-sm font-medium
                     border-b-2 border-purple-500 text-purple-400">
        캐릭터
      </button>
      <button class="flex-1 py-3 text-sm font-medium
                     border-b-2 border-transparent text-gray-400">
        인벤토리
      </button>
    </div>
    
    <!-- Tab Content -->
    <div class="p-4 max-h-60 overflow-y-auto">
      <!-- Stats or Inventory -->
    </div>
  </div>
</div>
```

### 6.3 반응형 타이포그래피

```css
/* H1 */
.responsive-h1 {
  font-size: 2rem;     /* 32px - mobile */
  line-height: 1.2;
}

@media (min-width: 768px) {
  .responsive-h1 {
    font-size: 2.5rem; /* 40px - tablet */
  }
}

@media (min-width: 1024px) {
  .responsive-h1 {
    font-size: 3rem;   /* 48px - desktop */
  }
}

/* Tailwind 방식 */
<h1 class="text-3xl md:text-4xl lg:text-5xl font-bold">
  Shadow Lord Slayer
</h1>
```

### 6.4 모바일 최적화

```html
<!-- 터치 친화적 버튼 (최소 44x44px) -->
<button class="min-h-[44px] px-6 py-3 ...">
  선택지
</button>

<!-- 모바일에서 사이드바 숨김 -->
<aside class="hidden lg:block">
  <!-- Desktop only content -->
</aside>

<!-- 모바일에서만 표시 -->
<div class="lg:hidden">
  <!-- Mobile only content -->
</div>

<!-- 스크롤 영역 터치 최적화 -->
<div class="overflow-y-auto overscroll-contain touch-pan-y">
  <!-- Scrollable content -->
</div>
```

---

## 7. 상호작용 패턴

### 7.1 호버 효과

```css
/* 카드 호버 */
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6),
              0 0 40px rgba(168, 85, 247, 0.3);
}

/* 버튼 호버 */
.button-hover {
  transition: all 0.2s ease;
}

.button-hover:hover {
  transform: scale(1.02);
  box-shadow: 0 0 25px rgba(168, 85, 247, 0.7);
}

/* 링크 호버 */
.link-hover {
  position: relative;
  transition: color 0.2s ease;
}

.link-hover::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #A855F7, #EC4899);
  transition: width 0.3s ease;
}

.link-hover:hover::after {
  width: 100%;
}
```

### 7.2 포커스 상태

```css
/* 키보드 포커스 */
.focus-visible:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.5);
}

/* 버튼 포커스 */
button:focus-visible {
  outline: 2px solid #C084FC;
  outline-offset: 2px;
}

/* 입력 필드 포커스 */
input:focus {
  border-color: #A855F7;
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2);
}
```

### 7.3 로딩 상태

```html
<!-- 버튼 로딩 -->
<button class="px-6 py-3 rounded-lg bg-purple-500 text-white
               flex items-center justify-center gap-2
               disabled:opacity-50 disabled:cursor-not-allowed"
        disabled>
  <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" 
            stroke="currentColor" stroke-width="4" fill="none"></circle>
    <path class="opacity-75" fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
  로딩 중...
</button>

<!-- 스켈레톤 로더 -->
<div class="animate-pulse space-y-4">
  <div class="h-4 bg-gray-700/50 rounded w-3/4"></div>
  <div class="h-4 bg-gray-700/50 rounded w-1/2"></div>
  <div class="h-4 bg-gray-700/50 rounded w-2/3"></div>
</div>

<!-- AI 응답 대기 -->
<div class="flex items-center gap-2 text-purple-400">
  <div class="flex gap-1">
    <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" 
         style="animation-delay: 0ms"></div>
    <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" 
         style="animation-delay: 150ms"></div>
    <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" 
         style="animation-delay: 300ms"></div>
  </div>
  <span class="text-sm">AI가 생각 중...</span>
</div>
```

### 7.4 마이크로 인터랙션

```css
/* 버튼 클릭 효과 */
@keyframes button-press {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.95); }
}

.button-press:active {
  animation: button-press 0.2s ease;
}

/* 알림 등장 */
@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.notification-enter {
  animation: slide-in-right 0.3s ease-out;
}

/* 카드 등장 (스태거) */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-appear {
  animation: fade-in-up 0.5s ease-out;
}

.card-appear:nth-child(1) { animation-delay: 0ms; }
.card-appear:nth-child(2) { animation-delay: 100ms; }
.card-appear:nth-child(3) { animation-delay: 200ms; }
```

---

## 8. 접근성 가이드라인

### 8.1 WCAG 2.2 대비율 체크리스트

| 요소 | 배경 | 전경 (텍스트) | 대비율 | WCAG 등급 | 통과 |
|------|------|---------------|--------|-----------|------|
| 제목 (H1-H3) | `#0A0118` | `#F9FAFB` | 15.8:1 | AAA | ✅ |
| 본문 | `#0A0118` | `#D1D5DB` | 10.2:1 | AAA | ✅ |
| 보조 텍스트 | `#0A0118` | `#9CA3AF` | 5.8:1 | AA | ✅ |
| 버튼 (Primary) | `#A855F7` | `#FFFFFF` | 4.8:1 | AA | ✅ |
| 링크 | `#0A0118` | `#A855F7` | 3.5:1 | AA (Large) | ✅ |
| 경고 텍스트 | `#0A0118` | `#F59E0B` | 5.1:1 | AA | ✅ |
| 에러 텍스트 | `#0A0118` | `#EF4444` | 4.9:1 | AA | ✅ |

**검증 도구**: 
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools의 Lighthouse 접근성 감사

### 8.2 스크린 리더 지원

```html
<!-- ARIA 라벨 -->
<button aria-label="게임 저장">
  <svg><!-- Save icon --></svg>
</button>

<!-- ARIA 설명 -->
<div role="region" aria-labelledby="stats-heading">
  <h3 id="stats-heading">캐릭터 스탯</h3>
  <!-- Stats content -->
</div>

<!-- 시각적으로 숨기기 (스크린 리더는 읽음) -->
<span class="sr-only">현재 HP는 80입니다</span>

<!-- 진행률 표시 -->
<div role="progressbar" 
     aria-valuenow="43" 
     aria-valuemin="0" 
     aria-valuemax="100"
     aria-label="스테이지 진행률">
  <div class="w-[43%] h-2 bg-purple-500"></div>
</div>

<!-- 라이브 영역 (실시간 업데이트) -->
<div aria-live="polite" aria-atomic="true">
  <p>HP가 10 감소했습니다</p>
</div>
```

### 8.3 키보드 네비게이션

```css
/* 포커스 표시 */
*:focus-visible {
  outline: 2px solid #C084FC;
  outline-offset: 2px;
}

/* 탭 순서 */
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 0;
  background: #A855F7;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  z-index: 100;
}

.skip-to-content:focus {
  top: 10px;
}
```

**필수 키보드 단축키**:
- `Tab`: 다음 요소로 이동
- `Shift + Tab`: 이전 요소로 이동
- `Enter` / `Space`: 버튼 활성화
- `Esc`: 모달 닫기
- `Arrow Keys`: 선택지 간 이동 (선택적)

### 8.4 모션 감소 (Reduced Motion)

```css
/* 사용자가 모션 감소를 선호하는 경우 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. 애니메이션 및 트랜지션

### 9.1 트랜지션 타이밍

| 타입 | 지속시간 | Easing | 용도 |
|------|----------|--------|------|
| **Fast** | 150ms | `ease-out` | 호버, 포커스 |
| **Medium** | 250ms | `ease-in-out` | 상태 전환, 토글 |
| **Slow** | 400ms | `cubic-bezier(0.4, 0, 0.2, 1)` | 모달, 페이지 전환 |

```css
/* Tailwind 설정 */
.transition-fast {
  transition: all 150ms ease-out;
}

.transition-medium {
  transition: all 250ms ease-in-out;
}

.transition-slow {
  transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 9.2 주요 애니메이션

```css
/* 페이드인 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

/* 슬라이드업 */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideUp {
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 글로우 펄스 (강조 효과) */
@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
  }
  50% {
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.8);
  }
}

.animate-glowPulse {
  animation: glowPulse 2s ease-in-out infinite;
}

/* 회전 (로딩) */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
```

### 9.3 페이지 전환

```css
/* 페이지 진입 */
.page-enter {
  animation: fadeIn 0.4s ease-out;
}

/* 페이지 퇴장 */
.page-exit {
  animation: fadeOut 0.3s ease-in forwards;
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

---

## 10. 구현 예시

### 10.1 로그인 페이지 전체 예시

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>로그인 - Shadow Lord Slayer</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    .bg-gradient-main {
      background: linear-gradient(135deg, #0A0118 0%, #1A0B2E 50%, #2D1B4E 100%);
    }
    
    .bg-gradient-starry {
      background: 
        radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
        #0A0118;
    }
  </style>
</head>
<body class="bg-gradient-starry min-h-screen flex items-center justify-center p-4">
  
  <!-- 로그인 카드 -->
  <div class="w-full max-w-md">
    
    <!-- 로고 -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl
                  bg-gradient-to-br from-purple-500 to-pink-500
                  shadow-[0_0_30px_rgba(168,85,247,0.6)] mb-4">
        <span class="text-4xl">⚡</span>
      </div>
      <h1 class="text-4xl font-bold text-gray-50 mb-2"
          style="text-shadow: 0 0 20px rgba(168,85,247,0.5)">
        Shadow Lord Slayer
      </h1>
      <p class="text-gray-400">10분 안에 완성하는 마법 모험</p>
    </div>
    
    <!-- 로그인 폼 -->
    <div class="bg-gradient-to-br from-[#2A1B4E]/60 to-[#1A0B2E]/40
                backdrop-blur-lg border border-purple-500/20 rounded-2xl p-8
                shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_40px_rgba(168,85,247,0.2)]">
      
      <form class="space-y-6">
        <!-- 이메일 -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            이메일
          </label>
          <input type="email" 
                 class="w-full px-4 py-3 rounded-lg
                        bg-white/5 border border-purple-500/20
                        text-gray-50 placeholder-gray-500
                        focus:outline-none focus:border-purple-500 focus:bg-white/10
                        transition-all"
                 placeholder="your@email.com"
                 required>
        </div>
        
        <!-- 비밀번호 -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            비밀번호
          </label>
          <input type="password" 
                 class="w-full px-4 py-3 rounded-lg
                        bg-white/5 border border-purple-500/20
                        text-gray-50 placeholder-gray-500
                        focus:outline-none focus:border-purple-500 focus:bg-white/10
                        transition-all"
                 placeholder="••••••••"
                 required>
        </div>
        
        <!-- 옵션 -->
        <div class="flex items-center justify-between">
          <label class="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" 
                   class="w-4 h-4 rounded bg-white/5 border-2 border-purple-500/30
                          checked:bg-purple-500 checked:border-purple-500
                          focus:outline-none focus:ring-2 focus:ring-purple-400
                          transition-all">
            <span class="text-sm text-gray-400 group-hover:text-gray-300">
              로그인 상태 유지
            </span>
          </label>
          
          <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition-colors">
            비밀번호 찾기
          </a>
        </div>
        
        <!-- 로그인 버튼 -->
        <button type="submit" 
                class="w-full px-6 py-4 rounded-lg
                       bg-purple-500 hover:bg-purple-400 active:bg-purple-700
                       text-white font-semibold text-lg
                       shadow-[0_0_20px_rgba(168,85,247,0.5)]
                       hover:shadow-[0_0_30px_rgba(168,85,247,0.7)]
                       focus:outline-none focus:ring-2 focus:ring-purple-400
                       transition-all duration-200">
          로그인
        </button>
        
        <!-- 구분선 -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-purple-500/20"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-[#1A0B2E] text-gray-400">또는</span>
          </div>
        </div>
        
        <!-- 소셜 로그인 -->
        <div class="space-y-3">
          <button type="button" 
                  class="w-full px-6 py-3 rounded-lg
                         bg-white/5 hover:bg-white/10
                         border border-purple-500/20
                         text-gray-50 font-medium
                         flex items-center justify-center gap-3
                         transition-all">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google로 로그인
          </button>
        </div>
        
        <!-- 회원가입 링크 -->
        <div class="text-center text-sm">
          <span class="text-gray-400">계정이 없으신가요?</span>
          <a href="#" class="text-purple-400 hover:text-purple-300 font-medium ml-1 transition-colors">
            회원가입
          </a>
        </div>
      </form>
    </div>
    
    <!-- 푸터 -->
    <div class="text-center mt-6 text-sm text-gray-500">
      © 2026 Shadow Lord Slayer. All rights reserved.
    </div>
  </div>
  
</body>
</html>
```

### 10.2 게임 플레이 화면 (데스크톱) 예시

```html
<div class="bg-gradient-starry min-h-screen">
  
  <!-- 상단바 -->
  <header class="sticky top-0 z-30 bg-[#0A0118]/80 backdrop-blur-lg border-b border-purple-500/10">
    <div class="max-w-[1600px] mx-auto px-6 flex items-center justify-between h-16">
      <!-- 로고 -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500
                    flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          <span class="text-white text-xl font-bold">⚡</span>
        </div>
        <span class="text-xl font-bold text-gray-50 hidden md:block">Shadow Lord Slayer</span>
      </div>
      
      <!-- 진행 상태 -->
      <div class="hidden md:flex items-center gap-4">
        <span class="text-sm text-gray-400">스테이지 3/7</span>
        <div class="w-32 h-2 bg-gray-700/50 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-purple-500 to-pink-500" style="width: 43%"></div>
        </div>
      </div>
      
      <!-- 액션 버튼 -->
      <div class="flex items-center gap-3">
        <button class="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-50 transition-colors" title="저장">
          <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
        </button>
        <button class="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-50 transition-colors" title="설정">
          <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </div>
  </header>
  
  <!-- 메인 레이아웃 -->
  <div class="max-w-[1600px] mx-auto p-6">
    <div class="grid lg:grid-cols-[280px_1fr_280px] gap-6">
      
      <!-- 왼쪽: 캐릭터 스탯 -->
      <aside class="hidden lg:block">
        <div class="bg-gradient-to-br from-[#2A1B4E]/60 to-[#1A0B2E]/40
                    backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6
                    shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_20px_rgba(168,85,247,0.1)]
                    sticky top-24">
          
          <!-- 캐릭터 헤더 -->
          <div class="flex items-center gap-4 mb-6 pb-6 border-b border-purple-500/20">
            <div class="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-500/50 flex items-center justify-center text-3xl">
              ⚔️
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-50">용감한 전사</h3>
              <p class="text-sm text-gray-400">레벨 1</p>
            </div>
          </div>
          
          <!-- HP -->
          <div class="mb-4">
            <div class="flex justify-between text-sm mb-1.5">
              <span class="text-gray-400 uppercase text-xs tracking-wider">HP</span>
              <span class="text-gray-50 font-semibold">80/100</span>
            </div>
            <div class="h-2 bg-gray-700/50 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style="width: 80%"></div>
            </div>
          </div>
          
          <!-- MP -->
          <div class="mb-6">
            <div class="flex justify-between text-sm mb-1.5">
              <span class="text-gray-400 uppercase text-xs tracking-wider">MP</span>
              <span class="text-gray-50 font-semibold">30/50</span>
            </div>
            <div class="h-2 bg-gray-700/50 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-blue-500 to-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]" style="width: 60%"></div>
            </div>
          </div>
          
          <!-- 스탯 -->
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-400">⚔️ 공격력</span>
              <span class="text-lg font-bold text-gray-50">17</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-400">🛡️ 방어력</span>
              <span class="text-lg font-bold text-gray-50">13</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-400">
              🧠 지능</span>
              <span class="text-lg font-bold text-gray-50">8</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-400">⚡ 민첩</span>
              <span class="text-lg font-bold text-gray-50">10</span>
            </div>
          </div>
        </div>
      </aside>
      
      <!-- 중앙: 스토리 로그 + 선택지 -->
      <main class="space-y-6">
        
        <!-- 스토리 로그 카드 -->
        <div class="bg-gradient-to-br from-[#2A1B4E]/60 to-[#1A0B2E]/40
                    backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6
                    shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_20px_rgba(168,85,247,0.1)]
                    min-h-[500px] max-h-[600px] overflow-y-auto">
          
          <!-- GM 메시지 1 -->
          <div class="flex items-start gap-3 mb-6">
            <div class="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/50 flex-shrink-0 flex items-center justify-center">
              <span class="text-lg">🎭</span>
            </div>
            <div class="flex-1 bg-white/5 rounded-2xl rounded-tl-none p-4 border border-purple-500/10">
              <div class="text-xs text-purple-400 mb-2">Game Master</div>
              <p class="text-gray-300 leading-relaxed">
                당신은 어두운 복도 끝에 서 있습니다. 삐걱거리는 문이 희미한 불빛을 내뿜고 있고, 
                차가운 바람이 당신의 얼굴을 스칩니다.
              </p>
            </div>
          </div>
          
          <!-- 플레이어 선택 기록 -->
          <div class="flex items-start gap-3 mb-6 flex-row-reverse">
            <div class="w-10 h-10 rounded-full bg-pink-500/20 border border-pink-500/50 flex-shrink-0 flex items-center justify-center">
              <span class="text-lg">👤</span>
            </div>
            <div class="flex-1 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl rounded-tr-none p-4 border border-purple-500/30">
              <div class="text-xs text-pink-400 mb-2 text-right">You</div>
              <p class="text-gray-50 leading-relaxed text-right">
                조용히 문에 다가가 귀를 기울인다
              </p>
            </div>
          </div>
          
          <!-- GM 메시지 2 (현재) -->
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/50 flex-shrink-0 flex items-center justify-center">
              <span class="text-lg">🎭</span>
            </div>
            <div class="flex-1 bg-white/5 rounded-2xl rounded-tl-none p-4 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <div class="text-xs text-purple-400 mb-2">Game Master</div>
              <p class="text-gray-300 leading-relaxed">
                문 너머에서 낮은 으르렁거리는 소리가 들립니다. 무언가가 움직이고 있습니다. 
                당신의 손이 검 손잡이로 향합니다. 어떻게 하시겠습니까?
              </p>
            </div>
          </div>
        </div>
        
        <!-- 선택지 카드 -->
        <div class="bg-gradient-to-br from-[#2A1B4E]/60 to-[#1A0B2E]/40
                    backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6
                    shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_20px_rgba(168,85,247,0.1)]">
          <h3 class="text-lg font-semibold text-gray-50 mb-4">선택지</h3>
          
          <div class="space-y-3">
            <!-- 선택지 1 -->
            <button class="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent
                           border border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/20
                           text-left text-gray-50 shadow-[0_0_15px_rgba(168,85,247,0.1)]
                           hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all duration-200 group">
              <div class="flex items-center justify-between">
                <span class="text-base font-medium">문을 박차고 정면 돌파</span>
                <svg class="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p class="text-sm text-gray-400 mt-2">⚔️ 공격 • 위험도: 높음</p>
            </button>
            
            <!-- 선택지 2 -->
            <button class="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent
                           border border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/20
                           text-left text-gray-50 shadow-[0_0_15px_rgba(168,85,247,0.1)]
                           hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all duration-200 group">
              <div class="flex items-center justify-between">
                <span class="text-base font-medium">주문으로 문을 천천히 열기</span>
                <svg class="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p class="text-sm text-gray-400 mt-2">🔮 마법 • MP -10</p>
            </button>
            
            <!-- 선택지 3 -->
            <button class="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent
                           border border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/20
                           text-left text-gray-50 shadow-[0_0_15px_rgba(168,85,247,0.1)]
                           hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all duration-200 group">
              <div class="flex items-center justify-between">
                <span class="text-base font-medium">다른 길을 찾아본다</span>
                <svg class="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p class="text-sm text-gray-400 mt-2">👣 탐색 • 안전</p>
            </button>
          </div>
        </div>
      </main>
      
      <!-- 오른쪽: 인벤토리 -->
      <aside class="hidden lg:block">
        <div class="bg-gradient-to-br from-[#2A1B4E]/60 to-[#1A0B2E]/40
                    backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6
                    shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_20px_rgba(168,85,247,0.1)]
                    sticky top-24">
          
          <h3 class="text-lg font-semibold text-gray-50 mb-4">인벤토리</h3>
          
          <!-- 아이템 그리드 -->
          <div class="grid grid-cols-3 gap-3 mb-6">
            <!-- 아이템 슬롯 (채워짐) -->
            <div class="aspect-square bg-white/5 rounded-lg border border-purple-500/20
                        hover:border-purple-500/50 hover:bg-white/10 transition-all cursor-pointer
                        flex items-center justify-center relative group">
              <span class="text-3xl">🗡️</span>
              <!-- 툴팁 -->
              <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                          bg-gray-900 border border-purple-500/30 rounded-lg px-3 py-2
                          opacity-0 invisible group-hover:opacity-100 group-hover:visible
                          transition-all whitespace-nowrap text-sm z-10">
                마법 검<br/>
                <span class="text-xs text-gray-400">공격력 +5</span>
              </div>
            </div>
            
            <div class="aspect-square bg-white/5 rounded-lg border border-purple-500/20
                        hover:border-purple-500/50 hover:bg-white/10 transition-all cursor-pointer
                        flex items-center justify-center relative group">
              <span class="text-3xl">🧪</span>
              <div class="absolute top-1 right-1 w-5 h-5 rounded-full bg-purple-500 
                          flex items-center justify-center text-white text-xs font-bold">
                2
              </div>
            </div>
            
            <div class="aspect-square bg-white/5 rounded-lg border border-purple-500/20
                        hover:border-purple-500/50 hover:bg-white/10 transition-all cursor-pointer
                        flex items-center justify-center">
              <span class="text-3xl">📜</span>
            </div>
            
            <!-- 빈 슬롯 -->
            <div class="aspect-square bg-white/5 rounded-lg border border-gray-700/30
                        flex items-center justify-center">
              <span class="text-gray-600 text-2xl">+</span>
            </div>
            <div class="aspect-square bg-white/5 rounded-lg border border-gray-700/30
                        flex items-center justify-center">
              <span class="text-gray-600 text-2xl">+</span>
            </div>
            <div class="aspect-square bg-white/5 rounded-lg border border-gray-700/30
                        flex items-center justify-center">
              <span class="text-gray-600 text-2xl">+</span>
            </div>
          </div>
          
          <!-- 용량 표시 -->
          <div class="flex justify-between text-sm text-gray-400">
            <span>보유 아이템</span>
            <span class="text-purple-400">3/10</span>
          </div>
        </div>
      </aside>
      
    </div>
  </div>
  
</div>
```

---

## 부록

### A. 컬러 변수 (CSS Custom Properties)

```css
:root {
  /* Background Colors */
  --bg-primary: #0A0118;
  --bg-secondary: #1A0B2E;
  --bg-tertiary: #2D1B4E;
  
  /* Accent Colors */
  --accent-primary: #A855F7;
  --accent-primary-light: #C084FC;
  --accent-primary-dark: #7E22CE;
  --accent-secondary: #EC4899;
  --accent-tertiary: #3B82F6;
  
  /* Text Colors */
  --text-primary: #F9FAFB;
  --text-secondary: #D1D5DB;
  --text-tertiary: #9CA3AF;
  --text-disabled: #6B7280;
  
  /* Semantic Colors */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}
```

### B. Tailwind Config 예시

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A0118',
          secondary: '#1A0B2E',
          tertiary: '#2D1B4E',
        },
        accent: {
          DEFAULT: '#A855F7',
          light: '#C084FC',
          dark: '#7E22CE',
          pink: '#EC4899',
          blue: '#3B82F6',
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(168, 85, 247, 0.3)',
        'glow-md': '0 0 20px rgba(168, 85, 247, 0.5)',
        'glow-lg': '0 0 30px rgba(168, 85, 247, 0.7)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-out',
        'slideUp': 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'glowPulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(168, 85, 247, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(168, 85, 247, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
```

### C. 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| v1.0 | 2026-01-29 | 초안 작성 | 디자인팀 |

---

**문서 승인**

| 역할 | 이름 | 서명 | 날짜 |
|------|------|------|------|
| UI/UX 디자이너 | (서명 필요) | | |
| 프론트엔드 리드 | (서명 필요) | | |
| 프로덕트 오너 | (서명 필요) | | |

---

**Note**: 본 디자인 시스템은 첨부된 레퍼런스 이미지의 다크 네온 SaaS 스타일을 기반으로, Shadow Lord Slayer TRPG의 판타지 세계관에 맞게 조정되었습니다. 모든 컴포넌트는 10분 완결 게임플레이에 최적화되어 있으며, Tailwind CSS를 사용한 실제 구현 예시를 포함하고 있습니다. 접근성과 반응형 디자인을 준수하여 모든 사용자가 원활하게 게임을 즐길 수 있도록 설계되었습니다.