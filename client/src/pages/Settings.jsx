import NavBar from './Member/NavBar'
import { useAuthContext } from '../context/useAuthcontext';
import { useState, useEffect } from 'react';
import ProfilePic from "../assets/profileImage.png";

const Settings = () => {
    const { user } = useAuthContext();
    const [userData, setUserData] = useState();
    const [file, setFile] = useState();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }
    useEffect(() => {
        const getData = async () => {
            const url = `https://kyusdabackend-ghbbf8a8fvete4ax.southafricanorth-01.azurewebsites.net/kyusda/v1/user/${user.id}`;
            const resp = await fetch(url);
            const data = await resp.json();
            setUserData(data);
        };
        getData();
    }, user.id);
    return (
        <div className='max-w-7xl mx-auto p-8'>
            <NavBar user={user} />
            {/* default values */}
            <div className='flex-1 grid grid-cols-2 gap-8 p-8'>
                <div className='bg-white p-6 rounded-lg shadow-md'>
                    <h2 className='text-2xl font-bold mb-6 text-center'>Profile information</h2>
                    <div className='space-y-4'>
                        <div className='flex items-center justify-center mb-6'>
                            <img
                                src={userData?.profilePic || ProfilePic}
                                alt="Profile pic"
                                className='w-32 h-32 rounded-full object-cover'
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor='FirstName' className='block text-gray-700 font-semibold'>First Name</label>
                                <input
                                    type="text"
                                    placeholder={userData?.firstName}
                                    defaultValue={userData?.firstName}
                                    className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                            <div>
                                <label htmlFor='LastName' className='block text-gray-700 font-semibold'>Last Name</label>
                                <input
                                    type="text"
                                    placeholder={userData?.lastName}
                                    defaultValue={userData?.lastName}
                                    className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                            <div>
                                <label htmlFor='Email' className='block text-gray-700 font-semibold'>Email</label>
                                <input
                                    type="email"
                                    placeholder={userData?.email}
                                    defaultValue={userData?.email}
                                    className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                            <div>
                                <label htmlFor='RegistrationNumber' className='block text-gray-700 font-semibold'>Registration Number</label>
                                <input
                                    type="text"
                                    placeholder={userData?.registration}
                                    defaultValue={userData?.registration}
                                    className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                            <div>
                                <label htmlFor='Course' className='block text-gray-700 font-semibold'>Course</label>
                                <input
                                    type="text"
                                    placeholder={userData?.course}
                                    defaultValue={userData?.course}
                                    className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                            <div>
                                <label htmlFor='Year' className='block text-gray-700 font-semibold'>Year</label>
                                <input
                                    type="text"
                                    placeholder={userData?.year}
                                    defaultValue={userData?.year}
                                    className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                            <div>
                                <label htmlFor='PhoneNumber' className='block text-gray-700 font-semibold'>Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder={userData?.phoneNumber}
                                    defaultValue={userData?.phoneNumber}
                                    className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-wite p-6 rounded-lg shadow-md'>
                    <h2 className='text-2xl font-bold mb-6'>Update Profile Picture</h2>
                    <form className='space-y-4'>
                        <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center'>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className='hidden'
                                id="profile-upload"
                            />
                            <label
                                htmlFor="profile-upload"
                                className='cursor-pointer block'
                            >
                                {file ? (
                                    <div className='text-green-600'>
                                        File selected: {file.name}
                                    </div>
                                ) : (
                                    <div>
                                        <p className='text-gray-600'>Drop your image here or click to upload</p>
                                        <p className='text-sm text-gray-400 mt-2'>Supports JPG, PNG, GIF up to 5MB</p>
                                    </div>
                                )}
                            </label>
                        </div>
                        <button
                            type="submit"
                            className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200'
                        >
                            Upload New Profile Picture
                        </button>
                    </form>
                </div>

            </div>

            {/* Form to upload the profile image */}

            <div>

            </div>
        </div>
    )
}

export default Settings
