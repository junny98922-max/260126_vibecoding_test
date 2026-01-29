# Shadow Lord Slayer TRPG - Testing Checklist

## ✅ Pre-Test Verification
- [x] Environment variables set in `.env.local`
- [x] Supabase table `conversations` exists
- [x] Dev server running on http://localhost:3000
- [x] OpenAI API connection verified
- [x] Supabase connection verified
- [x] API endpoint `/api/chat` working

## 🎮 Browser Testing

### Visual Appearance
Visit http://localhost:3000 and verify:

- [ ] Dark theme applied (purple/black background)
- [ ] Header shows "Shadow Lord Slayer" with sword icon
- [ ] "새 게임" button visible in top right
- [ ] Opening message from GM displayed
- [ ] Opening message includes 3 numbered choices
- [ ] Message input field at bottom with send button
- [ ] Purple glow effects on buttons
- [ ] Responsive layout (try resizing window)

### Chat Functionality
Test the chat interface:

- [ ] Type "1" in the input field
- [ ] Press Enter (or click send button)
- [ ] Loading indicator appears ("GM이 생각 중...")
- [ ] Input field is disabled during loading
- [ ] AI response appears within 10 seconds
- [ ] AI response is in Korean
- [ ] AI response relates to your choice
- [ ] Messages auto-scroll to bottom
- [ ] User message appears in gray bubble (right side)
- [ ] GM message appears in purple bubble (left side)

### Message Interaction
- [ ] Type a longer message (e.g., "나는 용감하게 마을로 들어간다")
- [ ] Message sends successfully
- [ ] AI responds with narrative continuation
- [ ] Try choosing option 2 or 3
- [ ] AI responds appropriately to each choice

### Character Limit
- [ ] Try typing more than 500 characters
- [ ] Input should stop accepting text at 500 chars
- [ ] Counter or limit indicator (if implemented)

### Keyboard Shortcuts
- [ ] Press Enter to send message
- [ ] Press Shift+Enter to create new line
- [ ] Empty messages cannot be sent

### New Game Feature
- [ ] Click "새 게임" button in header
- [ ] Confirmation modal appears
- [ ] Modal shows warning about current game
- [ ] Click "취소" - modal closes, game continues
- [ ] Click "새 게임" again
- [ ] Click "새 게임 시작" - chat resets
- [ ] New opening message appears
- [ ] Previous messages cleared from UI
- [ ] New session ID generated

### Database Persistence
Open browser DevTools (F12) and check:

- [ ] Open Network tab
- [ ] Send a message
- [ ] See POST request to `/api/chat`
- [ ] Response includes `reply` field
- [ ] Open Application/Storage tab
- [ ] Check localStorage for session ID
- [ ] Session ID persists across page refresh

### Session Persistence
- [ ] Send 2-3 messages to create conversation
- [ ] Note the messages in the chat
- [ ] Refresh the page (F5)
- [ ] **Note**: UI messages are NOT restored (by design)
- [ ] Session ID remains the same (check localStorage)
- [ ] Send a new message
- [ ] AI should have context from previous messages

### Mobile Responsive
Test on different screen sizes:

- [ ] Desktop (1920px): Centered layout, max-width 768px
- [ ] Tablet (768px): Full width with padding
- [ ] Mobile (375px): Full width, smaller padding
- [ ] Message bubbles scale appropriately
- [ ] Header remains readable
- [ ] Input field usable on mobile
- [ ] Send button accessible

## 🔍 Database Verification

Check Supabase dashboard:

- [ ] Go to Supabase project dashboard
- [ ] Open Table Editor
- [ ] Select `conversations` table
- [ ] See your test messages saved
- [ ] Each message has correct `role` (user/assistant)
- [ ] Session ID matches localStorage value
- [ ] Timestamps are accurate
- [ ] Content is saved correctly

Or use SQL query:
```sql
SELECT session_id, role, LEFT(content, 50) as preview, created_at
FROM conversations
ORDER BY created_at DESC
LIMIT 10;
```

## 🐛 Error Testing

### Invalid/Missing Credentials
- [ ] Stop dev server
- [ ] Remove OpenAI key from `.env.local`
- [ ] Restart dev server
- [ ] Try sending message
- [ ] Should show error message (not crash)

### Network Issues
- [ ] Open browser DevTools > Network tab
- [ ] Set throttling to "Slow 3G"
- [ ] Send a message
- [ ] Loading indicator should show longer
- [ ] Message eventually sends

### Rate Limiting
- [ ] Send 10+ messages rapidly
- [ ] All should process (no rate limit in MVP)
- [ ] Later: should show rate limit warning

## 📊 Performance Testing

- [ ] Send 20+ messages to build conversation
- [ ] Check page doesn't lag
- [ ] Scrolling is smooth
- [ ] No memory leaks (check DevTools Memory tab)
- [ ] Message rendering is fast

## ✨ User Experience

Overall feel:
- [ ] UI is visually appealing
- [ ] Dark fantasy theme is immersive
- [ ] Loading states are clear
- [ ] Error messages are helpful
- [ ] Interface is intuitive
- [ ] No confusing elements
- [ ] Mobile experience is good

## 🎯 Game Experience

Play for 5-10 minutes:
- [ ] AI GM provides immersive storytelling
- [ ] Choices have meaningful consequences
- [ ] Story progresses logically
- [ ] Combat is exciting
- [ ] Atmosphere is maintained
- [ ] Korean language is natural
- [ ] Game is fun and engaging!

## 📝 Issues Found

Document any issues below:

1. **Issue**:
   - **Severity**: (Low/Medium/High)
   - **Steps to reproduce**:
   - **Expected**:
   - **Actual**:

2. **Issue**:
   - **Severity**:
   - **Steps to reproduce**:
   - **Expected**:
   - **Actual**:

---

## ✅ Final Verdict

- [ ] All critical features working
- [ ] No blocking bugs
- [ ] Ready for demo/sharing
- [ ] Ready for deployment

**Test Date**: _________________
**Tester**: _________________
**Overall Status**: ⭐⭐⭐⭐⭐ (rate 1-5 stars)

---

## 🚀 Next Steps After Testing

If all tests pass:
1. ✅ Application is ready to use
2. Consider deploying to Vercel
3. Share with friends to test
4. Implement post-MVP features

If issues found:
1. Document issues above
2. Prioritize fixes
3. Re-test after fixes
4. Iterate until stable
