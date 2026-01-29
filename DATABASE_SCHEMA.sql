-- Shadow Lord Slayer TRPG - Supabase Database Schema
-- Run this in Supabase SQL Editor to set up the database

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_conversations_session_id
  ON conversations(session_id);

CREATE INDEX IF NOT EXISTS idx_conversations_created_at
  ON conversations(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous access (for MVP)
-- Note: In production, you should implement proper authentication
DROP POLICY IF EXISTS "Allow anonymous access" ON conversations;

CREATE POLICY "Allow anonymous access" ON conversations
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Optional: Add comments for documentation
COMMENT ON TABLE conversations IS 'Stores all TRPG conversation messages between users and the AI Game Master';
COMMENT ON COLUMN conversations.session_id IS 'Unique identifier for each game session';
COMMENT ON COLUMN conversations.role IS 'Message sender: user or assistant (AI GM)';
COMMENT ON COLUMN conversations.content IS 'The actual message content';
COMMENT ON COLUMN conversations.created_at IS 'Timestamp when the message was created';

-- Optional: View to see recent conversations
CREATE OR REPLACE VIEW recent_conversations AS
SELECT
  session_id,
  role,
  content,
  created_at,
  ROW_NUMBER() OVER (PARTITION BY session_id ORDER BY created_at DESC) as message_order
FROM conversations
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

COMMENT ON VIEW recent_conversations IS 'Shows conversations from the last 7 days with message ordering';
