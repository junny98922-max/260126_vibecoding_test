# Shadow Lord Slayer TRPG - Setup Guide

## ✅ Implementation Complete

The Shadow Lord Slayer TRPG chatbot has been successfully implemented according to the plan. All core features are in place and ready to use.

## 🎯 What's Implemented

### Core Features
- ✅ AI-powered Game Master using GPT-4o-mini
- ✅ Real-time chat interface with message history
- ✅ Session management with localStorage persistence
- ✅ Supabase integration for message storage
- ✅ Dark fantasy themed UI
- ✅ New Game functionality with confirmation modal
- ✅ Responsive design (mobile & desktop)

### Architecture
- ✅ Feature-Sliced Design (FSD) structure
- ✅ Type-safe TypeScript implementation
- ✅ Client-side rendering with React 19
- ✅ Next.js 15 App Router

### Tech Stack
- ✅ Next.js 15 + React 19 + TypeScript
- ✅ Tailwind CSS for styling
- ✅ Supabase for database
- ✅ OpenAI GPT-4o-mini for AI responses
- ✅ Shadcn UI components

## 🔧 Required Setup

### 1. Environment Variables

You need to configure the following environment variables in `.env.local`:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-api-key-here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**How to get these values:**

#### OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy and paste it into `OPENAI_API_KEY`

#### Supabase Credentials
1. Go to https://supabase.com/dashboard
2. Create a new project (or use existing)
3. Go to Project Settings > API
4. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Database Setup

Create a `conversations` table in your Supabase database:

```sql
-- Create conversations table
CREATE TABLE conversations (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_conversations_session_id ON conversations(session_id);
CREATE INDEX idx_conversations_created_at ON conversations(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous access (for MVP)
CREATE POLICY "Allow anonymous access" ON conversations
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

**To execute this SQL:**
1. Open your Supabase project
2. Go to SQL Editor
3. Create a new query
4. Paste the SQL above
5. Click "Run"

### 3. Start the Application

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Visit http://localhost:3000

## 🎮 How to Use

1. **First Visit**: The game automatically starts with an opening message
2. **Make Choices**: Type your choice (1, 2, 3, or custom action)
3. **Interact**: Chat with the AI Game Master naturally
4. **New Game**: Click "새 게임" button to start over

## 📁 Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts          # OpenAI API endpoint
│   ├── page.tsx                   # Main page (ChatContainer)
│   └── globals.css                # Dark theme styles
├── features/
│   └── chat/
│       ├── model/
│       │   └── useChat.ts         # Chat state management
│       └── ui/
│           ├── ChatContainer.tsx  # Main chat component
│           ├── ChatHeader.tsx     # Header with new game button
│           ├── ChatInput.tsx      # Message input field
│           ├── MessageList.tsx    # Message container
│           ├── MessageItem.tsx    # Individual message bubble
│           ├── LoadingIndicator.tsx # AI thinking animation
│           └── NewGameModal.tsx   # Confirmation dialog
├── shared/
│   ├── api/
│   │   └── conversations.ts       # Supabase API functions
│   ├── config/
│   │   └── prompts.ts            # AI prompts & opening message
│   └── lib/
│       └── session.ts            # Session management
├── lib/
│   ├── supabase.ts               # Supabase client
│   └── openai.ts                 # OpenAI client
└── types/
    └── index.ts                  # TypeScript types
```

## 🎨 Design Features

- **Dark Fantasy Theme**: Purple and dark blue color scheme
- **Glow Effects**: Buttons and cards have purple glow
- **Responsive Layout**: Works on mobile (375px) to desktop (1920px)
- **Auto-scroll**: Messages automatically scroll to bottom
- **Loading States**: Visual feedback when AI is thinking

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## ⚙️ Configuration

### OpenAI Settings (in `src/app/api/chat/route.ts`)

```typescript
{
  model: 'gpt-4o-mini',        // Fast & cost-effective
  max_tokens: 500,             // Max response length
  temperature: 0.8,            // Creativity level
  presence_penalty: 0.3,       // Encourage diverse responses
  frequency_penalty: 0.3       // Reduce repetition
}
```

### Message Limits

- Input: 500 characters max
- Context: Last 20 messages sent to AI
- All messages saved to database

## 🔍 Troubleshooting

### Build Errors
- Ensure all environment variables are set
- Check that Supabase URL and key are correct

### API Errors
- Verify OpenAI API key is valid and has credits
- Check Supabase table exists with correct schema

### No Messages Saving
- Check Supabase RLS policies are configured
- Verify network requests in browser DevTools

### AI Not Responding
- Check OpenAI API key in .env.local
- Verify API route is working (check /api/chat)
- Check browser console for errors

## 📝 Next Steps (Post-MVP)

Priority features to add:

1. **Load Previous Conversations**: Show session history
2. **Character Selection**: Choose archetype (Warrior, Mage, Rogue)
3. **Stats/Inventory Sidebar**: Track character stats
4. **Export Story**: Download conversation as PDF
5. **User Authentication**: Save progress across devices

## 🎯 Testing Checklist

- [x] Page loads successfully
- [x] Session ID generated
- [x] Opening message displays
- [ ] User can send messages (needs Supabase setup)
- [ ] AI responds (needs OpenAI API key)
- [x] New game button works
- [x] Mobile responsive
- [x] Build succeeds
- [x] TypeScript compiles without errors

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Feature-Sliced Design](https://feature-sliced.design/)

---

**Ready to play!** Just add your environment variables and create the database table. 🎮✨
