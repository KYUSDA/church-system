export default {
    name: "quiz",
    title: "Quizzes",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Quiz Title",
        type: "string",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "image",
        title: "Quiz Image",
        type: "image",
        options: {
          hotspot: true,
        },
      },
      {
        name: "description",
        title: "Description",
        type: "text",
      },
      {
        name: "questions",
        title: "Questions",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              {
                name: "questionText",
                title: "Question",
                type: "string",
                validation: (Rule) => Rule.required(),
              },
              {
                name: "options",
                title: "Options",
                type: "array",
                of: [
                  {
                    type: "object",
                    fields: [
                      {
                        name: "text",
                        title: "Option Text",
                        type: "string",
                        validation: (Rule) => Rule.required(),
                      },
                      {
                        name: "isCorrect",
                        title: "Is Correct",
                        type: "boolean",
                        initialValue: false,
                      },
                    ],
                  },
                ],
                validation: (Rule) => Rule.min(2).required(),
              },
            ],
          },
        ],
      },
      {
        name: "week",
        title: "Week Number",
        type: "number",
        validation: (Rule) => Rule.min(1).required(),
      },
      {
        name: "completed",
        title: "Completed",
        type: "boolean",
        initialValue: false,
      },
      {
        name: "score",
        title: "Score",
        type: "number",
        description: "Number of correct answers",
        hidden: ({ document }) => !document?.completed,
      },
      {
        name: "totalQuestions",
        title: "Total Questions",
        type: "number",
        description: "Total number of questions in the quiz",
      },
    ],
  };
  