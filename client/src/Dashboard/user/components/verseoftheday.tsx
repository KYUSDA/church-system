import { useEffect, useState } from "react";
import { BASE_URL } from "@/services/base_query";


interface VerseData {
  text: string;
  reference: string;
}

function VerseOfTheDay() {
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const today = new Date().toISOString().split("T")[0];
  // const stored = localStorage.getItem("votd");

  // if (stored) {
  //   const parsed = JSON.parse(stored);

  //   if (parsed.date === today) {
  //     setVerse(parsed.data);
  //     setLoading(false);
  //     return;
  //   }
  // }

  fetch(`${BASE_URL}/user/votd`)
    .then((res) => res.json())
    .then((data) => {
       console.log("verse", data);
      // if (!data) {
      //   throw new Error("Failed to fetch verse");
      // }

      const verseData = data.verse;

     

      // localStorage.setItem(
      //   "votd",
      //   JSON.stringify({
      //     date: today,
      //     data: verseData,
      //   }),
      // );

      setVerse(verseData);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching verse:", err);
      setLoading(false);
    });
}, []);

  if (loading) {
    return (
      <div className="bg-blue-50 p-6 rounded-3xl animate-pulse">
        <div className="h-4 bg-blue-200 rounded mb-4" />
        <div className="h-4 bg-blue-200 rounded w-3/4 mb-4" />
        <div className="h-4 bg-blue-200 rounded w-1/2" />
      </div>
    );
  }

  if (!verse) return null;

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <div className="bg-gradient-to-br from-blue-50 to-white shadow-sm rounded-3xl p-8 text-center">
        <p className="text-sm uppercase tracking-wider text-blue-600 font-medium mb-4">
          Verse of the Day
        </p>

        <blockquote className="text-lg md:text-xl text-slate-700 italic leading-relaxed mb-6">
          “{verse.text}”
        </blockquote>

        <p className="text-blue-700 font-semibold">— {verse.reference} (KJV)</p>
      </div>
    </section>
  );
}

export default VerseOfTheDay;
