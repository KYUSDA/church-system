import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TFamily } from "../../../../services/adminService";

export default function NewFamily() {
  const [formData, setFormData] = useState<Omit<TFamily, '_id'>>({
    title: "",
    description: "",
    link: "",
    imgUrl: "",
    locationUrl: "",
    tags: []
  });
  const [tagInput, setTagInput] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you would upload the file and get the URL here
      const file = e.target.files[0];
      const imgUrl = URL.createObjectURL(file); // Temporary local URL
      setFormData(prev => ({ ...prev, imgUrl }));
    }
  };

  const handleLocationFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const locationUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, locationUrl }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting family:", formData);
    // Here you would typically send the data to your API
    navigate("/families");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Add New Family</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                type="text"
                required
                value={formData.title}
                placeholder="Family title"
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                placeholder="Family description"
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                Link <span className="text-red-500">*</span>
              </label>
              <input
                name="link"
                type="url"
                required
                value={formData.link}
                placeholder="https://example.com"
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                Family Image <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col items-center">
                {formData.imgUrl ? (
                  <div className="relative mb-4">
                    <img 
                      src={formData.imgUrl} 
                      alt="Family preview" 
                      className="h-40 w-40 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, imgUrl: "" }))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5">
                      <svg
                        className="w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="pt-1 text-sm text-gray-600">Upload family image</p>
                    </div>
                    <input 
                      type="file" 
                      className="opacity-0" 
                      onChange={handleFileChange}
                      accept="image/*"
                      required
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Location Image</label>
              <div className="flex flex-col items-center">
                {formData.locationUrl ? (
                  <div className="relative mb-4">
                    <img 
                      src={formData.locationUrl} 
                      alt="Location preview" 
                      className="h-40 w-40 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, locationUrl: "" }))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5">
                      <svg
                        className="w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="pt-1 text-sm text-gray-600">Upload location image (optional)</p>
                    </div>
                    <input 
                      type="file" 
                      className="opacity-0" 
                      onChange={handleLocationFileChange}
                      accept="image/*"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <label className="text-gray-700 font-medium mb-2 block">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag"
              className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Family
          </button>
        </div>
      </form>
    </div>
  );
}