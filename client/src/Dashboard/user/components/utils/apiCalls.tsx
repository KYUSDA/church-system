import { BASE_URL, getAuthHeaders } from "@/services/authService";

export const getProgress = () =>

  fetch(`${BASE_URL}/user/progress`, 
    {  headers: getAuthHeaders() }
  ).then((r) => r.json());


export const toggle = (bookName: string, chapterNumber: number) =>
  fetch(`${BASE_URL}/user/toggle`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ bookName, chapterNumber }),
  }).then((r) => r.json());

export const getStreak = () =>
  fetch(`${BASE_URL}/user/streak`, { headers: getAuthHeaders() }).then((r) =>
    r.json()
  );


export const updateStreak = (currentStreak: number, lastReadDate: string) =>
  fetch(`${BASE_URL}/user/streak`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ currentStreak, lastReadDate }),
  }).then((r) => r.json());
