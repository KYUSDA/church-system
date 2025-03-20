import { useState } from "react";
import { useDispatch } from "react-redux";

export default function NewFamily() {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(inputs);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const family = { ...inputs };

    window.location.replace("/");
  };

  return (
    <div className="flex-4 p-4">
      <h1 className="text-2xl font-bold mb-4">New Family</h1>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold mb-2">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Family Name"
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
            placeholder="Head Name"
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold mb-2">Location</label>
          <input
            name="location"
            type="text"
            placeholder="Location"
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold mb-2">Bio</label>
          <input
            name="bio"
            type="text"
            placeholder="Event"
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={handleClick}
          className="mt-4 px-4 py-2 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
        >
          Create
        </button>
      </form>
    </div>
  );
}
