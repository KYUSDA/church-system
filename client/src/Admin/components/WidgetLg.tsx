import React, { useState, useEffect } from 'react';
import { userRequest } from './requestMethods';
import { format } from 'timeago.js';

const WidgetLg: React.FC = () => {
  const Button: React.FC<{ type: 'approved' | 'declined' | 'pending' }> = ({ type }) => {
    const buttonStyles = {
      approved: 'bg-green-100 text-green-600',
      declined: 'bg-red-100 text-red-600',
      pending: 'bg-blue-100 text-blue-600',
    };
    return (
      <button
        className={`px-3 py-1 rounded-lg border-none ${
          buttonStyles[type] || ''
        }`}
      >
        {type}
      </button>
    );
  };

  const [claims, setClaims] = useState<any[]>([]);

  useEffect(() => {
    const getclaims = async () => {
      try {
        const res = await userRequest.get('/claim/getApproved/?paid=true');
        let { myApproved } = res.data.data;
        const data = myApproved;
        console.log(data);
        setClaims(data);
      } catch {}
    };
    getclaims();
  }, []);

  return (
    <div className="flex-2 shadow-md p-5">
      <h3 className="text-lg font-semibold">Important Upcoming Events</h3>
      <table className="w-full border-spacing-5">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Date</th>
            <th className="text-left">Department Incharge</th>
            <th className="text-left">Speaker</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim._id}>
              <td className="font-semibold">
                <span>{claim.carOwner}</span>
              </td>
              <td className="font-light">{format(claim.dateSubmitted)}</td>
              <td className="font-light">{claim.amount}</td>
              <td>
                <Button type={claim.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WidgetLg;
