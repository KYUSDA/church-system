import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { MdOutlineReportProblem, MdOutlineBugReport, MdDesignServices } from "react-icons/md";
import { RiFunctionLine } from "react-icons/ri";
import { useReportIssueMutation } from "../../services/authService";
import { toast } from "sonner";
const ReportIssue = () => {
  const [issueTitle, setIssueTitle] = useState("");
  const [reportIssue, setReportIssue] = useState("");
  const [reportIssueMutation] = useReportIssueMutation();

  const handleReportIssue = async () => {
    if (!issueTitle.trim() || !reportIssue.trim()) return;
   
    // Send the issue report to the server
    const res = await reportIssueMutation({ title: issueTitle, description: reportIssue });
    if (res) {
      toast.success("Issue reported successfully!");
      setIssueTitle("");
      setReportIssue("");
    }else{
      toast.error("Failed to report");
      
    }
   
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Report Issue Header */}
      <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-2 mb-4">
        <MdOutlineReportProblem className="text-red-600 text-2xl" />
        <span>Report an Issue</span>
      </h3>

      {/* What Can Be Reported? */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h4 className="text-lg font-semibold mb-3">What can you report?</h4>
        <ul className="space-y-3">
          <li className="flex items-center space-x-2">
            <MdOutlineBugReport className="text-red-500 text-xl" />
            <span><strong>Bugs & Errors:</strong> Any technical issues, crashes, or unexpected behavior.</span>
          </li>
          <li className="flex items-center space-x-2">
            <RiFunctionLine className="text-blue-500 text-xl" />
            <span><strong>Functionality Issues:</strong> Features not working as expected or missing functionalities.</span>
          </li>
          <li className="flex items-center space-x-2">
            <MdDesignServices className="text-green-500 text-xl" />
            <span><strong>UI/UX Suggestions:</strong> Design improvements, readability, or user experience enhancements.</span>
          </li>
        </ul>
      </div>

      {/* Report an Issue Form */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h4 className="text-lg font-semibold flex items-center space-x-2 mb-2">
          <MdOutlineReportProblem className="text-red-600" />
          <span>Describe the issue</span>
        </h4>
        
        <div>
          <label className="block text-sm font-semibold text-gray-600">Issue Title</label>
        <input
          type="text"
          placeholder="Issue Title"
          value={issueTitle}
          onChange={(e) => setIssueTitle(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 mb-2"
        />
         </div>
         <div>
         <label className="block text-sm font-semibold text-gray-600">Issue Description</label>
        <textarea
          placeholder="Provide a detailed description of the issue..."
          value={reportIssue}
          onChange={(e) => setReportIssue(e.target.value)}
          className="w-full mt-2 p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
          rows={4}
        />
        </div>
        <button
          onClick={handleReportIssue}
          className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
        >
          <FiAlertCircle />
          <span>Submit Report</span>
        </button>
      </div>
    </div>
  );
};

export default ReportIssue;
