import { PlusCircle } from "lucide-react";

const actions = ["User", "Department", "Family"];

const QuickActions = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-gray-400 to-gray-600 shadow-md rounded-lg text-white">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="flex gap-4">
        {actions.map((action) => (
          <button key={action} className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded shadow">
            <PlusCircle size={20} />
            Create {action}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
