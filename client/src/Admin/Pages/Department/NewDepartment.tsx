import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NewDepartment() {
  const [formData, setFormData] = useState<Omit<TDepartment, '_id'>>({
    title: "",
    description: "",
    link: "",
    imgUrl: ""
  });
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      try {
        // In a real app, you would upload to your backend/Sanity here
        const file = e.target.files[0];
        const imgUrl = {
          asset: {
            _ref: `image-${Date.now()}-${file.name}` // Simulating Sanity asset reference
          }
        };
        setFormData(prev => ({ ...prev, imgUrl }));
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Submitting department:", formData);
      // Here you would typically send the data to your API
      // await createDepartment(formData);
      alert("Department created successfully!");
      navigate("/departments");
    } catch (error) {
      console.error("Error creating department:", error);
      alert("Failed to create department");
    }
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
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Create New Department</h1>
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
                placeholder="Department title"
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
                placeholder="Department description"
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
                Department Image <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col items-center">
                {typeof formData.imgUrl === 'string' && formData.imgUrl ? (
                  <div className="relative mb-4">
                    <img 
                      src={formData.imgUrl} 
                      alt="Department preview" 
                      className="h-40 w-full object-cover rounded-lg"
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
                ) : formData.imgUrl ? (
                  <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-600">Image reference created:</p>
                    <code className="text-xs mt-1 block overflow-x-auto">
                      {JSON.stringify(formData.imgUrl)}
                    </code>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, imgUrl: "" }))}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5">
                      {isUploading ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      ) : (
                        <>
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
                          <p className="pt-1 text-sm text-gray-600">Upload department image</p>
                        </>
                      )}
                    </div>
                    <input 
                      type="file" 
                      className="opacity-0" 
                      onChange={handleFileChange}
                      accept="image/*"
                      required
                      disabled={isUploading}
                    />
                  </label>
                )}
              </div>
            </div>
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
            disabled={isUploading}
            className={`px-6 py-2.5 rounded-lg text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isUploading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isUploading ? 'Creating...' : 'Create Department'}
          </button>
        </div>
      </form>
    </div>
  );
}

export type TDepartment = {
  _id: string;
  title: string;
  imgUrl: { asset: { _ref: string } } | string;
  description: string;
  link: string;
};