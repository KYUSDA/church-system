import React, { useEffect, useState } from 'react';
import { Visibility } from '@mui/icons-material';
import { userRequest } from './requestMethods';

interface User {
  _id: string;
  email: string;
  img?: string;
}

const WidgetSm: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      console.log('user details being fetched');
      try {
        const res = await userRequest.get("/user/getUsers/?new=true");
        console.log(res.data, 'users registered are');
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="flex-1 shadow-md p-5 mr-5">
      <span className="text-xl font-semibold">New Church Members</span>
      <ul className="list-none p-0 m-0">
        {users.map((user) => (
          <li className="flex items-center justify-between my-5" key={user._id}>
            <img
              src={
                user.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-semibold">{user.email}</span>
            </div>
            <button className="flex items-center border-none rounded-lg px-3 py-2 bg-gray-100 text-gray-700 cursor-pointer">
              <Visibility className="text-sm mr-1" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetSm;
