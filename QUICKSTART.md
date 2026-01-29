# Shadow Lord Slayer TRPG - Quick Start

## 🚀 Get Started in 3 Steps

### Step 1: Add API Keys
Edit `.env.local` and add your credentials:
```env
OPENAI_API_KEY=sk-your-key-here
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 2: Create Database Table
1. Go to your Supabase project
2. Open SQL Editor
3. Run `DATABASE_SCHEMA.sql` (copy/paste the entire file)
4. Click "Run"

### Step 3: Start the App
```bash
npm run dev
```

Visit http://localhost:3000 and start playing!

## 📖 Where to Get API Keys

**OpenAI**: https://platform.openai.com/api-keys
**Supabase**: https://supabase.com/dashboard → Project Settings → API

## 📚 Documentation

- `SETUP_GUIDE.md` - Detailed setup instructions
- `IMPLEMENTATION_SUMMARY.md` - Complete implementation details
- `DATABASE_SCHEMA.sql` - Database setup script

## 🎮 How to Play

1. Read the opening message from the Game Master
2. Choose an option (1, 2, 3) or type your own action
3. Press Enter to send your message
4. The AI Game Master responds with the story continuation
5. Click "새 게임" to start a new adventure

## 🐛 Troubleshooting

**Build fails?** Check environment variables are set correctly.
**No AI response?** Verify OpenAI API key and check console.
**Messages not saving?** Run DATABASE_SCHEMA.sql in Supabase.

---

**Ready to slay the Shadow Lord!** ⚔️
