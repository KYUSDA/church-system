import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { getBaseUrl } from '@/services/base_query';

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  questionText: string;
  options: Option[];
}

interface QuizFormData {
  title: string;
  image: {
    public_id: string;
    url: string;
  };
  description: string;
  questions: Question[];
  week: number;
}

const QuizAdminPanel = () => {
  const [formData, setFormData] = useState<QuizFormData>({
    title: '',
    image: { public_id: '', url: '' },
    description: '',
    questions: [],
    week: 1,
  });
  const [showReview, setShowReview] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const BASE_URL = getBaseUrl();

  // Add new question
  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          questionText: '',
          options: [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
          ],
        },
      ],
    }));
  };

  // Add new option to a question
  const addOption = (questionIndex: number) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options.push({ text: '', isCorrect: false });
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle question text changes
  const handleQuestionChange = (index: number, text: string) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index].questionText = text;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // Handle option changes
  const handleOptionChange = (questionIndex: number, optionIndex: number, field: string, value: string | boolean) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = {
      ...updatedQuestions[questionIndex].options[optionIndex],
      [field]: value
    };
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // Submit to backend
  const handleSubmit = async () => {
    try {
      await axios.post(`${BASE_URL}/quizzes/create-quizze`, formData);
      toast.success('Quiz saved successfully!');
      setFormData({
        title: '',
        image: { public_id: '', url: '' },
        description: '',
        questions: [],
        week: 1,
      });
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Main Form */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Quiz</h2>

        {/* Quiz Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="title"
            placeholder="Quiz Title"
            className="p-2 border rounded"
            value={formData.title}
            onChange={handleChange}
          />
          <input
            type="number"
            name="week"
            placeholder="Week Number"
            className="p-2 border rounded"
            value={formData.week}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Quiz Description"
            className="p-2 border rounded md:col-span-2"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Questions Section */}
        <div className="space-y-6">
          {formData.questions.map((question, qIndex) => (
            <div key={qIndex} className="border p-4 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Question {qIndex + 1}</h3>
                <button
                  onClick={() => setEditingIndex(qIndex)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
              </div>

              <input
                type="text"
                placeholder="Question Text"
                className="w-full p-2 border rounded mb-4"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder={`Option ${oIndex + 1}`}
                      className="p-2 border rounded flex-1"
                      value={option.text}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, 'text', e.target.value)}
                    />
                    <label className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={option.isCorrect}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, 'isCorrect', e.target.checked)}
                        className="form-checkbox h-4 w-4"
                      />
                      <span className="text-sm">Correct</span>
                    </label>
                  </div>
                ))}
              </div>
              <button
                onClick={() => addOption(qIndex)}
                className="mt-2 text-sm text-green-600 hover:text-green-800"
              >
                + Add Option
              </button>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <button
            onClick={addQuestion}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Question
          </button>
          <button
            onClick={() => setShowReview(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Review Quiz
          </button>
        </div>
      </div>

      {/* Review Modal */}
      {showReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Quiz Review</h3>
            <div className="space-y-4">
              {formData.questions.map((question, qIndex) => (
                <div key={qIndex} className="border-b pb-4">
                  <h4 className="font-semibold mb-2">Q{qIndex + 1}: {question.questionText}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {question.options.map((option, oIndex) => (
                      <div
                        key={oIndex}
                        className={`p-2 rounded ${option.isCorrect ? 'bg-green-100' : 'bg-gray-100'}`}
                      >
                        {option.text}
                        {option.isCorrect && (
                          <span className="ml-2 text-green-600">✓ Correct</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setShowReview(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Back to Edit
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizAdminPanel;
