import React, { useState } from "react";
import { Search } from "lucide-react";
import {  toast } from 'sonner';
import jsPDF from "jspdf";

const Reports: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const generatePDF = (title: string, data: string[]) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(title, 10, 10);
    doc.setFontSize(12);
    data.forEach((item, index) => {
      doc.text(`${index + 1}. ${item}`, 10, 20 + index * 10);
    });
    doc.save(`${title}.pdf`);
    toast.success(`${title} report downloaded successfully`);
  };

  const handleGenerateUserReport = () => {
    const userData = ["User1: John Doe", "User2: Jane Smith", "User3: Alice Johnson"];
    generatePDF("User Report", userData);
  };

  const handleGenerateTriviaReport = () => {
    const triviaData = ["Trivia1: Question A", "Trivia2: Question B", "Trivia3: Question C"];
    generatePDF("Bible Trivia Report", triviaData);
  };

  const handleGenerateOtherReports = () => {
    const otherData = ["Report1: Summary A", "Report2: Summary B", "Report3: Summary C"];
    generatePDF("Other Reports", otherData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-800">Reports</h2>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button
          onClick={handleGenerateUserReport}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Generate User Report
        </button>
        <button
          onClick={handleGenerateTriviaReport}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Generate Bible Trivia Report
        </button>
        <button
          onClick={handleGenerateOtherReports}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Generate Other Reports
        </button>
      </div>
    </div>
  );
};

export default Reports;
