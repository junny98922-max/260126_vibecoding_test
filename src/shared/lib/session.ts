const SESSION_KEY = 'shadow_lord_session_id';

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') {
    return generateNewSessionId();
  }

  const existing = localStorage.getItem(SESSION_KEY);
  if (existing) {
    return existing;
  }

  const newId = generateNewSessionId();
  localStorage.setItem(SESSION_KEY, newId);
  return newId;
}

export function generateNewSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

export function clearSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function setSessionId(sessionId: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, sessionId);
  }
}
