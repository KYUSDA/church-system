
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const BibleTrivia = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentScripture, setCurrentScripture] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [confetti, setConfetti] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeout, setTimeoutFlag] = useState(false);
  const [error, setError] = useState("");
  const [triviaResults, setTriviaResults] = useState([]);

  const [bible] = useState([
    { book: "Genesis", chapters: 50 },
    { book: "Exodus", chapters: 40 },
    { book: "Leviticus", chapters: 27 },
    { book: "Numbers", chapters: 36 },
    { book: "Deuteronomy", chapters: 34 },
    { book: "Joshua", chapters: 24 },
    { book: "Judges", chapters: 21 },
    { book: "Ruth", chapters: 4 },
    { book: "1 Samuel", chapters: 31 },
    { book: "2 Samuel", chapters: 24 },
    { book: "1 Kings", chapters: 22 },
    { book: "2 Kings", chapters: 25 },
    { book: "1 Chronicles", chapters: 29 },
    { book: "2 Chronicles", chapters: 36 },
    { book: "Ezra", chapters: 10 },
    { book: "Nehemiah", chapters: 13 },
    { book: "Esther", chapters: 10 },
    { book: "Job", chapters: 42 },
    { book: "Psalms", chapters: 150 },
    { book: "Proverbs", chapters: 31 },
    { book: "Ecclesiastes", chapters: 12 },
    { book: "Song of Solomon", chapters: 8 },
    { book: "Isaiah", chapters: 66 },
    { book: "Jeremiah", chapters: 52 },
    { book: "Lamentations", chapters: 5 },
    { book: "Ezekiel", chapters: 48 },
    { book: "Daniel", chapters: 12 },
    { book: "Hosea", chapters: 14 },
    { book: "Joel", chapters: 3 },
    { book: "Amos", chapters: 9 },
    { book: "Obadiah", chapters: 1 },
    { book: "Jonah", chapters: 4 },
    { book: "Micah", chapters: 7 },
    { book: "Nahum", chapters: 3 },
    { book: "Habakkuk", chapters: 3 },
    { book: "Zephaniah", chapters: 3 },
    { book: "Haggai", chapters: 2 },
    { book: "Zechariah", chapters: 14 },
    { book: "Malachi", chapters: 4 },
    { book: "Matthew", chapters: 28 },
    { book: "Mark", chapters: 16 },
    { book: "Luke", chapters: 24 },
    { book: "John", chapters: 21 },
    { book: "Acts", chapters: 28 },
    { book: "Romans", chapters: 16 },
    { book: "1 Corinthians", chapters: 16 },
    { book: "2 Corinthians", chapters: 13 },
    { book: "Galatians", chapters: 6 },
    { book: "Ephesians", chapters: 6 },
    { book: "Philippians", chapters: 4 },
    { book: "Colossians", chapters: 4 },
    { book: "1 Thessalonians", chapters: 5 },
    { book: "2 Thessalonians", chapters: 3 },
    { book: "1 Timothy", chapters: 6 },
    { book: "2 Timothy", chapters: 4 },
    { book: "Titus", chapters: 3 },
    { book: "Philemon", chapters: 1 },
    { book: "Hebrews", chapters: 13 },
    { book: "James", chapters: 5 },
    { book: "1 Peter", chapters: 5 },
    { book: "2 Peter", chapters: 3 },
    { book: "1 John", chapters: 5 },
    { book: "2 John", chapters: 1 },
    { book: "3 John", chapters: 1 },
    { book: "Jude", chapters: 1 },
    { book: "Revelation", chapters: 22 }
  ]);

  useEffect(() => {
    if (gameStarted && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0 && gameStarted) {
      setTimeoutFlag(true);
      handleAnswerSubmit(); // Automatically submit on timeout
    }
  }, [timer, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setQuestionCount(0);
    setScore(0);
    setGameOver(false);
    setShowResult(false);
    setTimeoutFlag(false);
    setTriviaResults([]); // Reset trivia results
    generateScripture();
  };

  const generateScripture = async () => {
    if (questionCount >= 10) {
      setGameOver(true);
      submitScore();
      return;
    }
    setTimeoutFlag(false);
    setShowResult(false);
    setTimer(30);
    setUserAnswer("");

    const randomBook = bible[Math.floor(Math.random() * bible.length)];
    const randomChapter = Math.floor(Math.random() * randomBook.chapters) + 1;
    try {
      const res = await fetch(`https://bible-api.com/${randomBook.book} ${randomChapter}:1?translation=kjv`);
      const data = await res.json();
      setCurrentScripture({
        book_name: randomBook.book,
        chapter: randomChapter,
        verse: 1,
        text: data.text,
      });
      setQuestionCount((prev) => prev + 1);
      setError(""); // Clear previous errors
    } catch (fetchError) {
      setError("Failed to fetch scripture. Please try again.");
      console.error("Fetch Error:", fetchError);
      setTimer(0);
      setTimeoutFlag(true);
    }
  };

  const handleAnswerSubmit = () => {
    if (gameOver) return;

    const isCorrect =
      userAnswer.toLowerCase() ===
      `${currentScripture.book_name} ${currentScripture.chapter}:${currentScripture.verse}`.toLowerCase();

    if (isCorrect && !timeout) {
      setScore((prev) => prev + 1);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3000);
    }
    setTriviaResults((prev) => [
      ...prev,
      {
        scripture: `${currentScripture.book_name} ${currentScripture.chapter}:${currentScripture.verse}`,
        userAnswer: userAnswer,
        correct: isCorrect,
      },
    ]);
    setShowResult(true);
  };

  const submitScore = async () => {
    try {
      await fetch("https://your-api.com/trivia/submit-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score, triviaResults }),
      });
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-5">
      {/* ... (rest of your JSX remains mostly the same) */}
      {!gameStarted ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Welcome to Bible Trivia!</h2>
          <p>Try to guess the correct book, chapter, and verse.</p>
          <button onClick={startGame} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
            Start Game
          </button>
        </div>
      ) : gameOver ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Game Over!</h2>
          <p>Your final score: {score}/10</p>
          <button onClick={startGame} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
            Play Again
          </button>
        </div>
      ) : (
        <div className="w-full max-w-2xl bg-white p-6 shadow-lg rounded-lg">
          {currentScripture && (
            <blockquote>
              <p className="text-xl font-semibold">{currentScripture.text}</p>
              <footer className="text-sm text-gray-500">Book Name?</footer>
            </blockquote>
          )}
          <div className="my-4 flex justify-between">
            <span className="text-lg font-semibold bg-teal-500 text-white p-2 rounded-md">
              Timer: {timer}s
            </span>
            <span className="text-lg font-semibold">Score: {score}</span>
          </div>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter Book, Chapter:Verse"
            disabled={timeout}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {timeout && <p className="text-red-500 mt-2">Time is up!</p>}
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleAnswerSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
              disabled={gameOver}
            >
              Submit Answer
            </button>
            <button
              onClick={generateScripture}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              disabled={timer > 0 && !showResult}
            >
              Next Question
            </button>
          </div>
        </div>
      )}
      {confetti && <Confetti />}
    </div>
  );
};

export default BibleTrivia;