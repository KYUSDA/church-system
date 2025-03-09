export const quizzes = [
    {
      title: "The Story of Creation",
      image: "creation.jpg",
      description: "Test your knowledge about the biblical story of creation.",
      week: 1,
      questions: [
        {
          questionText: "On which day did God create humans?",
          options: [
            { text: "First day", isCorrect: false },
            { text: "Sixth day", isCorrect: true },
            { text: "Seventh day", isCorrect: false },
            { text: "Fourth day", isCorrect: false },
          ],
        },
        {
          questionText: "What did God create on the second day?",
          options: [
            { text: "The sun, moon, and stars", isCorrect: false },
            { text: "The sky and waters", isCorrect: true },
            { text: "Animals and humans", isCorrect: false },
            { text: "Plants and trees", isCorrect: false },
          ],
        },
      ],
      isCompleted: false,
      totalQuestions: 2,
    },
    {
      title: "Understanding Death in Christianity",
      image: "death.jpg",
      description: "What does the Bible say about death?",
      week: 2,
      questions: [
        {
          questionText: "According to Romans 6:23, what is the wages of sin?",
          options: [
            { text: "Eternal life", isCorrect: false },
            { text: "Death", isCorrect: true },
            { text: "Suffering", isCorrect: false },
            { text: "Purgatory", isCorrect: false },
          ],
        },
        {
          questionText: "What did Jesus say about those who believe in Him, even if they die?",
          options: [
            { text: "They will be reborn as new people", isCorrect: false },
            { text: "They will live again", isCorrect: true },
            { text: "They will stay in their graves", isCorrect: false },
            { text: "They will become angels", isCorrect: false },
          ],
        },
      ],
      totalQuestions: 2,
    },
    {
      title: "Faith and Salvation",
      image: "faith.jpg",
      description: "Learn about faith and how it relates to salvation.",
      week: 3,
      questions: [
        {
          questionText: "Which book of the Bible says, 'The just shall live by faith'?",
          options: [
            { text: "Genesis", isCorrect: false },
            { text: "Romans", isCorrect: true },
            { text: "Psalms", isCorrect: false },
            { text: "Matthew", isCorrect: false },
          ],
        },
        {
          questionText: "Who is the 'author and finisher' of our faith according to Hebrews 12:2?",
          options: [
            { text: "Moses", isCorrect: false },
            { text: "Jesus", isCorrect: true },
            { text: "Paul", isCorrect: false },
            { text: "Abraham", isCorrect: false },
          ],
        },
      ],
      totalQuestions: 2,
    },
  ];
  