import { useState, useEffect } from "react";
import { supabase } from "../integrations/client";
import useUserData from "../../../../session/authData";

export const useUserReadingProgress = () => {
  const { user } = useUserData(); // This will always have a user since they're logged in
  const [readChapters, setReadChapters] = useState<Record<string, number[]>>(
    {}
  );
  const [loading, setLoading] = useState(false);

  // Load user's reading progress from Supabase database
  useEffect(() => {
    if (user?.id) {
      loadUserProgress();
    }
  }, [user]);

  const loadUserProgress = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("reading_progress")
        .select("book_name, chapter_number")
        .eq("user_id", user.id);

      if (error) throw error;

      const progress: Record<string, number[]> = {};
      data?.forEach(({ book_name, chapter_number }) => {
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
    if (!user?.id) {
      console.error("No user found");
      return false;
    }

    const currentChapters = readChapters[bookName] || [];
    const isRead = currentChapters.includes(chapterNumber);

    try {
      if (isRead) {
        // Remove chapter from database
        await supabase
          .from("reading_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("book_name", bookName)
          .eq("chapter_number", chapterNumber);
      } else {
        // Add chapter to database
        await supabase.from("reading_progress").insert({
          user_id: user.id,
          book_name: bookName,
          chapter_number: chapterNumber,
          read_at: new Date().toISOString(), // Optional: track when chapter was read
        });
      }

      // Update local state immediately for better UX
      setReadChapters((prev: Record<string, number[]>) => {
        const bookChapters = prev[bookName] || [];
        const newChapters = isRead
          ? bookChapters.filter((ch) => ch !== chapterNumber)
          : [...bookChapters, chapterNumber].sort((a, b) => a - b);

        return {
          ...prev,
          [bookName]: newChapters,
        };
      });

      return !isRead;
    } catch (error) {
      console.error("Error updating reading progress:", error);
      // Optionally, you could show a toast notification to the user here
      return isRead; // Return original state if update failed
    }
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
    if (user?.id) {
      loadUserStreak();
    }
  }, [user]);

  const loadUserStreak = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("user_streaks")
        .select("current_streak, last_read_date")
        .eq("user_id", user.id)
        .maybeSingle();

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
    if (!user?.id) {
      console.error("No user found");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    try {
      await supabase.from("user_streaks").upsert({
        user_id: user.id,
        current_streak: newStreak,
        last_read_date: today,
        updated_at: new Date().toISOString(),
      },{onConflict: 'user_id'});

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
