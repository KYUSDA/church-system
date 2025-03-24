import React, { useState, useEffect } from 'react';
import { userRequest } from './requestMethods';

const FeaturedInfo: React.FC = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [families, setFamilies] = useState<any[]>([]);
  const [department, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("/user/getUsers");
        const family = await userRequest.get('/family/getFamilies');
        const depart = await userRequest.get('/department/getAll');
        setMembers(res.data);
        setFamilies(family.data);
        setDepartments(depart.data);
      } catch (error) {
        console.error(error);
      }
    };
    getIncome();
  }, []);

  return (
    <div className="w-full flex justify-between">
      <div className="flex-1 mx-5 p-8 rounded-lg shadow-lg cursor-pointer">
        <span className="text-lg font-medium">Church Members</span>
        <div className="my-2 flex items-center">
          <span className="text-2xl font-semibold">{members.length}</span>
        </div>
      </div>
      <div className="flex-1 mx-5 p-8 rounded-lg shadow-lg cursor-pointer">
        <span className="text-lg font-medium">Families</span>
        <div className="my-2 flex items-center">
          <span className="text-2xl font-semibold">{families.length}</span>
        </div>
      </div>
      <div className="flex-1 mx-5 p-8 rounded-lg shadow-lg cursor-pointer">
        <span className="text-lg font-medium">Departments</span>
        <div className="my-2 flex items-center">
          <span className="text-2xl font-semibold">{department.length}</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedInfo;
