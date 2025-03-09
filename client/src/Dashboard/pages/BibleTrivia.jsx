import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const BibleTrivia = () => {
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
    { book: "Revelation", chapters: 22 },
  ]);

  const [currentScripture, setCurrentScripture] = useState({
    book_name: "John",
    chapter: 3,
    verse: 16,
    text: "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.",
  });

  const [searchFilter, setSearchFilter] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [guessCorrect, setGuessCorrect] = useState(true);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const generateScripture = async (e) => {
    e.preventDefault();
    setShowResult(false);
    setTimer(30); // Reset the timer on each question

    setCurrentScripture({
      book_name: "",
      chapter: 1,
      verse: 1,
      text: "...",
    });

    let i = 0;
    if (searchFilter === 1) i = Math.floor(Math.random() * 65 + 1);
    if (searchFilter === 2) i = Math.floor(Math.random() * 38 + 1);
    if (searchFilter === 3) i = Math.floor(Math.random() * 26 + 38);

    let Biblebook = bible[i];
    let chapter = Math.floor(Math.random() * Biblebook.chapters + 1);
    let verse = chapter === 117 ? 2 : Math.floor(Math.random() * 8 + 1);

    const res = await fetch(
      `https://bible-api.com/${Biblebook.book} ${chapter}:${verse}?translation=kjv`
    );
    const data = await res.json();

    const newScripture = {
      book_name: data.verses[0].book_name,
      chapter: data.verses[0].chapter,
      verse: data.verses[0].verse,
      text: data.verses[0].text,
    };

    setCurrentScripture(newScripture);
  };

  const handleChoiceChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const answer = (e) => {
    e.preventDefault();
    const isCorrect =
      userAnswer.toLowerCase() ===
      `${currentScripture.book_name} ${currentScripture.chapter}:${currentScripture.verse}`
        .toLowerCase();

    setGuessCorrect(isCorrect);

    if (isCorrect) {
      setScore(score + 1); // Increment score on correct answer
      setConfetti(true); // Show confetti on correct answer
      setTimeout(() => setConfetti(false), 3000); // Hide confetti after 3 seconds
    }

    setShowResult(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-5">
  <div className="flex flex-col md:flex-row w-full max-w-4xl space-y-6 md:space-x-6 md:space-y-0">
    {/* Scripture Box */}
    <div className="w-full md:w-2/3 p-6 bg-white shadow-lg rounded-lg">
      <blockquote className="mb-5">
        <p className="text-xl font-semibold">{currentScripture.text}</p>
        <footer className="text-sm text-gray-500">Book Name?</footer>
      </blockquote>
      {showResult && (
        <div className="mt-3 flex flex-col justify-center items-center">
          {guessCorrect ? (
            <p className="text-2xl text-green-500">
              ✔️ Your Answer <strong>"{userAnswer}"</strong> is correct!
            </p>
          ) : (
            <p className="text-2xl text-red-500">
              ❌ Your Answer <strong>"{userAnswer}"</strong> is wrong!
            </p>
          )}
          <div className="flex flex-col space-y-2">
            <p className="my-2">
              The correct answer is:
              <span className="text-green-500 ml-4">
                {currentScripture.book_name} {currentScripture.chapter}:{currentScripture.verse}
              </span>
            </p>

            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              onClick={generateScripture}
            >
              Generate New Scripture
            </button>
          </div>
        </div>
      )}
    </div>

    {/* Input and Timer Box */}
    <div className="w-full md:w-1/3 p-6 bg-gray-50 shadow-lg rounded-lg">
      <div className="flex justify-end mb-4">
        <h4 className="text-lg font-semibold bg-teal-600 text-white p-2 rounded-md">
          Time Left: {timer}s
        </h4>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={userAnswer}
          onChange={handleChoiceChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Book, Chapter:Verse"
        />
      </div>

      <div className="my-5 text-center">
        <p className="text-xl font-semibold">Score: {score}</p>
      </div>

      <button
        className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 mt-auto"
        onClick={answer}
      >
        Submit Answer
      </button>
    </div>
  </div>

  {/* Confetti effect */}
  {confetti && <Confetti />}
</div>
  );
};

export default BibleTrivia;
