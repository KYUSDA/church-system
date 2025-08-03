import { useState, useEffect } from "react";
import useUserData from "../../../../session/authData";
import { getProgress, getStreak, toggle } from "../utils/apiCalls";
import { toast } from "sonner";

export const useUserReadingProgress = () => {
  const { user } = useUserData(); // This will always have a user since they're logged in
  const [readChapters, setReadChapters] = useState<Record<string, number[]>>(
    {}
  );
  const [loading, setLoading] = useState(false);

  // Load user's reading progress from Supabase database
  useEffect(() => {
    if (user?.userId) {
      loadUserProgress();
    }
  }, [user]);

  const loadUserProgress = async () => {
    if (!user?.userId) return;

    setLoading(true);
    try {
      const { data, error } = await getProgress();

      if (error) throw error;

      const progress: Record<string, number[]> = {};
      data?.forEach((item: { book_name: string; chapter_number: number }) => {
        const { book_name, chapter_number } = item;
        if (!progress[book_name]) progress[book_name] = [];
        progress[book_name].push(chapter_number);
      });

      setReadChapters(progress);
    } catch (error) {
      console.error("Error loading user progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleChapter = async (bookName: string, chapterNumber: number) => {
    if (!user?.userId) return false;

    // Call backend no matter what
    const { success } = await toggle(bookName, chapterNumber);
    if (!success) {
      toast.error("Server rejected update");
      return false;
    }

    // Local optimistic update
    setReadChapters((prev) => {
      const chapters = prev[bookName] || [];
      const isRead = chapters.includes(chapterNumber);
      const next = isRead
        ? chapters.filter((ch) => ch !== chapterNumber)
        : [...chapters, chapterNumber].sort((a, b) => a - b);

      return { ...prev, [bookName]: next };
    });

    return true; 
  };
  

  return {
    readChapters,
    toggleChapter,
    loading,
    user,
  };
};

export const useUserStreak = () => {
  const { user } = useUserData();
  const [streak, setStreak] = useState<number>(0);
  const [lastReadDate, setLastReadDate] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.userId) {
      loadUserStreak();
    }
  }, [user]);

  const loadUserStreak = async () => {
    if (!user?.userId) return;

    setLoading(true);
    try {
      const { data, error } = await getStreak();

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        setStreak(data.current_streak || 0);
        setLastReadDate(data.last_read_date || "");
      }
    } catch (error) {
      console.error("Error loading user streak:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStreak = async (newStreak: number) => {
    if (!user?.userId) {
      console.error("No user found");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    try {
      await updateStreak(newStreak);

      setStreak(newStreak);
      setLastReadDate(today);
    } catch (error) {
      console.error("Error updating streak:", error);
    }
  };

  const calculateStreak = () => {
    if (!lastReadDate) return 0;

    const today = new Date();
    const lastRead = new Date(lastReadDate);
    const diffTime = Math.abs(today.getTime() - lastRead.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Continue streak
      return streak + 1;
    } else if (diffDays > 1) {
      // Break streak
      return 1;
    } else {
      // Same day
      return streak;
    }
  };

  return {
    streak,
    lastReadDate,
    updateStreak,
    calculateStreak,
    loading,
  };
};
