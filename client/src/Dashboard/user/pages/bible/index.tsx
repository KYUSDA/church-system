import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Flame, Star, User as UserIcon } from "lucide-react";
import Dashboard from "../../components/Dashboard";
import ReadingCalendar from "../../components/utils/ReadingCalendar";
import Confetti from "../../components/utils/Confetti";
import {
  useUserReadingProgress,
  useUserStreak,
} from "../../components/hooks/userProgress";
import { bibleBooks } from "../../components/data/bibleData";
import {
  getCurrentStreak,
  updateStreak,
} from "../../components/utils/dateHelpers";

type ActiveTab = "dashboard" | "calendar";

const BibleApp = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [showConfetti, setShowConfetti] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { readChapters, toggleChapter, loading } = useUserReadingProgress();
  const {
    streak,
    lastReadDate,
    updateStreak: updateUserStreak,
  } = useUserStreak();

  const motivationalMessages = [
    "You are growing in the Word! 🌱",
    "Every chapter brings you closer to God! ✨",
    "Your consistency is inspiring! 🙏",
    "Keep building that spiritual muscle! 💪",
    "The Word is transforming you daily! 🦋",
    "You're making God smile today! 😊",
  ];

  const dailyVerses = [
    '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, to give you hope and a future." - Jeremiah 29:11',
    '"Trust in the Lord with all your heart and lean not on your own understanding." - Proverbs 3:5',
    '"I can do all this through him who gives me strength." - Philippians 4:13',
    '"The Lord your God is with you, the Mighty Warrior who saves." - Zephaniah 3:17',
    '"Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go." - Joshua 1:9',
  ];

  const todayVerse = dailyVerses[new Date().getDay() % dailyVerses.length];
  const showMotivation = Math.random() < 0.2;
  const motivationMessage =
    motivationalMessages[
      Math.floor(Math.random() * motivationalMessages.length)
    ];

  const totalChapters = bibleBooks.reduce(
    (sum, book) => sum + book.chapters,
    0
  );
  const readChapterCount = Object.values(readChapters).reduce(
    (sum, chapters) => sum + chapters.length,
    0
  );
  const progressPercentage = Math.round(
    (readChapterCount / totalChapters) * 100
  );

  const handleToggleChapter = async (
    bookName: string,
    chapterNumber: number
  ) => {
    const wasRead = await toggleChapter(bookName, chapterNumber);

    if (wasRead) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      // Update streak
      const newStreak = updateStreak(lastReadDate);
      updateUserStreak(newStreak);
    }
  };

  const currentStreak = getCurrentStreak(lastReadDate, streak);

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const navItems = [
    { key: "dashboard" as const, icon: Star, label: "Dashboard" },
    { key: "calendar" as const, icon: Calendar, label: "Reading" }
  ];

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div>
      {showConfetti && <Confetti />}
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <motion.div>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-4 px-4">
            {todayVerse}
          </p>
          {showMotivation && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-amber-600 dark:text-amber-400 font-medium"
            >
              {motivationMessage}
            </motion.p>
          )}

          {/* Streak Display */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <Flame className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold text-gray-900 ">
              {currentStreak} day streak
            </span>
          </div>
        </motion.div>

        {/* Navigation Tabs - Desktop */}
        <div className="hidden md:flex justify-center my-8">
          <div className="bg-white  rounded-xl p-1 flex gap-1 shadow-lg">
            {navItems.map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  activeTab === key
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 "
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {activeTab === "dashboard" && (
              <Dashboard
                readChapters={readChapters}
                totalChapters={totalChapters}
                readChapterCount={readChapterCount}
                progressPercentage={progressPercentage}
                streak={currentStreak}
                bibleBooks={bibleBooks}
              />
            )}
            {activeTab === "calendar" && (
              <ReadingCalendar
                readChapters={readChapters}
                toggleChapter={toggleChapter}
                bibleBooks={bibleBooks}
                loading={loading}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default BibleApp;
