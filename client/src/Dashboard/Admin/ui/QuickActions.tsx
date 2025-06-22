import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  { name: "User", path: "/admin/newUser" },
  { name: "Department", path: "/admin/newDepart" },
  { name: "Family", path: "/admin/newFamily" },
  { name: "Resource", path: "/admin/newResource" },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-blue-50 shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="flex flex-wrap gap-4">
        {actions.map(({ name, path }) => (
          <button
            key={name}
            onClick={() => navigate(path)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded shadow hover:bg-blue-100 transition-all w-full sm:w-auto"
          >
            <PlusCircle size={20} />
            Create {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
