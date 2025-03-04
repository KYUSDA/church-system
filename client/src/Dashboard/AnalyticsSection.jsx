import React from 'react'

const AnalyticsSection = () => {
    return (
        <div className='grid grid-cols-4 gap-4 mt-16 max-lg:grid-cols-2 mb-8 max-sm:grid-cols-1'>
            <div className="bg-white rounded-xl p-4 shadow-lg">
                <h4 className="text-gray-500 text-sm">Family meeting Attendance</h4>
                <div className="flex items-center mt-2">
                    <span className="text-2xl font-bold">245</span>
                    <span className="text-green-500 text-sm ml-2">+12%</span>
                </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg">
                <h4 className="text-gray-500 text-sm">Project Contributions</h4>
                <div className="flex items-center mt-2">
                    <span className="text-2xl font-bold">KES 156,000</span>
                    <span className="text-green-500 text-sm ml-2">+8%</span>
                </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg">
                <h4 className="text-gray-500 text-sm">Resource Downloaded</h4>
                <div className="flex items-center mt-2">
                    <span className="text-2xl font-bold">30</span>
                    <span className="text-green-500 text-sm ml-2">+8%</span>
                </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg">
                <h4 className="text-gray-500 text-sm">Bible Trivia Ranking</h4>
                <div className="flex items-center mt-2">
                    <span className="text-2xl font-bold">200/400</span>
                    <span className="text-red-500 text-sm ml-2">-70</span>
                </div>
            </div>
        </div>
    )
}

export default AnalyticsSection
