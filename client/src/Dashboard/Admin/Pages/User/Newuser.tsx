import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewUser: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    registration: '',
    course: '',
    year: '',
    password: '',
    group: 'not yet assigned',
    role: 'Member',
    imgUrl: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      try {
        // In a real app, you would upload the file here
        const file = e.target.files[0];
        const imgUrl = URL.createObjectURL(file); // Temporary URL for preview
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
      console.log("Submitting user:", formData);
      // Here you would typically send the data to your API
      alert('User created successfully!');
      navigate('/users');
    } catch (error) {
      console.error("Error creating user:", error);
      alert('Failed to create user');
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
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Add New Church Member</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                placeholder="First Name"
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                placeholder="Last Name"
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                type="tel"
                required
                value={formData.phone}
                placeholder="Phone Number"
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Password <span className="text-red-500">*</span></label>
              <input
                name="password"
                type="password"
                required
                minLength={8}
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Registration Number</label>
              <input
                name="registration"
                type="text"
                value={formData.registration}
                placeholder="Registration No"
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Course</label>
              <input
                name="course"
                type="text"
                value={formData.course}
                placeholder="Course"
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Year</label>
              <input
                name="year"
                type="number"
                value={formData.year}
                placeholder="Year"
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Assign a Group</label>
              <select
                name="group"
                value={formData.group}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="not yet assigned">Not Assigned</option>
                <option value="Diaspora A">Diaspora A</option>
                <option value="Diaspora B">Diaspora B</option>
                <option value="Around School A">Around School A</option>
                <option value="Around School B">Around School B</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Member">Member</option>
                <option value="Elder">Elder</option>
                <option value="Department Head">Department Head</option>
                <option value="Family Leader">Family Leader</option>
                <option value="Deacon">Deacon</option>
                <option value="Deaconess">Deaconess</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Profile Photo</label>
              <div className="flex flex-col items-center">
                {formData.imgUrl ? (
                  <div className="relative mb-4">
                    <img 
                      src={formData.imgUrl} 
                      alt="Profile preview" 
                      className="h-32 w-32 object-cover rounded-full"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, imgUrl: '' }))}
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
                          <p className="pt-1 text-sm text-gray-600">Upload profile photo</p>
                        </>
                      )}
                    </div>
                    <input 
                      type="file" 
                      className="opacity-0" 
                      onChange={handleFileChange}
                      accept="image/*"
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
            {isUploading ? 'Creating...' : 'Create Member'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewUser;