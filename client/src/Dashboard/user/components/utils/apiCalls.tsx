

const API = "http://localhost:8000/kyusda/v1/user";

export const getProgress = () =>

  fetch(`${API}/progress`, { credentials: "include" }).then((r) => r.json());


export const toggle = (bookName: string, chapterNumber: number) =>
  fetch(`${API}/toggle`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookName, chapterNumber }),
  }).then((r) => r.json());

export const getStreak = () =>
  fetch(`${API}/streak`, { credentials: "include" }).then((r) => r.json());


export const updateStreak = (currentStreak: number, lastReadDate: string) =>
  fetch(`${API}/streak`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currentStreak, lastReadDate }),
  }).then((r) => r.json());
