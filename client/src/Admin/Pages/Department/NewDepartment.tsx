import { useState } from "react";
import { useDispatch } from "react-redux";

export default function NewDepartment() {
  const [inputs, setInputs] = useState({});
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(inputs);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const department = { ...inputs };
    console.log(department);
    // addDepartment(department, dispatch);
    alert("Department Created");
    window.location.replace("/");
  };

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">New Department</h1>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold mb-2">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Department Name"
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold mb-2">Elder in Charge</label>
          <input
            name="elder"
            type="text"
            placeholder="Elder in Charge"
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold mb-2">Head</label>
          <input
            name="head"
            type="text"
            placeholder="Head No"
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold mb-2">Project</label>
          <input
            name="project"
            type="text"
            placeholder="Project"
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold mb-2">Upcoming Event</label>
          <input
            name="event"
            type="text"
            placeholder="Event"
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={handleClick}
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  );
}
