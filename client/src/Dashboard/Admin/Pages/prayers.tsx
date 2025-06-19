import React, { useEffect, useState } from "react";
import { TPrayerRequest,useGetPrayersQuery } from "../../../services/adminService";
import { ChatBubbleOutline, Favorite, CalendarToday, Person } from "@mui/icons-material";

function Prayers() {
  const [prayers, setPrayers] = useState<TPrayerRequest[]>([]);
  const { data: prayersData, isLoading, error } = useGetPrayersQuery();

  useEffect(() => {
    if (prayersData && Array.isArray(prayersData)) {
      console.log("Setting prayers from prayersData:", prayersData);
      setPrayers(prayersData);
    }
  }, [prayersData]);

  console.log(prayers);

  // const formatPrayerDate = (dateString: string): string => {
  //   const prayerDate = new Date(dateString);
  //   return prayerDate.toLocaleDateString('en-US', {
  //     month: 'short',
  //     day: 'numeric',
  //     year: 'numeric'
  //   });
  // };

  const formatPrayerDate = (dateString: string): string => {
    const prayerDate = new Date(dateString);
    const today = new Date();
    const differenceInDays = Math.floor((today.getTime() - prayerDate.getTime()) / (1000 * 60 * 60 * 24));

    if (differenceInDays === 0) return "Today";
    if (differenceInDays < 7) return "This week";
    if (differenceInDays < 14) return "Last week";
    if (differenceInDays > 30) return "A month ago";
    return prayerDate.toLocaleDateString();
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Prayer Requests
          </h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {prayers.length} requests
          </span>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {prayers.length > 0 ? (
            prayers.map((prayer) => (
              <div 
                key={prayer._id} 
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-5">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                      <Person className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {prayer.name || "Anonymous"}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <CalendarToday className="mr-1" fontSize="small" />
                        <span>{formatPrayerDate(prayer.date)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-700 whitespace-pre-line">
                      {prayer.prayerRequest}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                      <Favorite className="mr-1" fontSize="small" />
                      <span className="text-sm font-medium">Pray</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                      <ChatBubbleOutline className="mr-1" fontSize="small" />
                      <span className="text-sm font-medium">Respond</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <div className="bg-white p-8 rounded-xl shadow-sm max-w-md mx-auto">
                <ChatBubbleOutline 
                  className="mx-auto text-gray-300" 
                  style={{ fontSize: '4rem' }} 
                />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No prayer requests yet
                </h3>
                <p className="mt-2 text-gray-500">
                  When people submit prayer requests, they'll appear here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Prayers;