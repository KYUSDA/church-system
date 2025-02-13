import React from 'react'

const CalenderSection = () => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Weekly Events</h3>
                <button className="text-blue-600">View Upcoming Event</button>
            </div>
            <div className="space-y-4">
                {[
                    { title: 'Sabbath', date: "Saturday's 8:00 AM", type: 'Worship' },
                    { title: 'Vespers', date: 'Wednesday/Friday 6:00 PM', type: 'Worship' },
                    { title: 'Choir Practice', date: 'Tuesdays', type: 'Music' },
                    { title: 'Family meeting', date: 'Sundays TBD', type: 'Study' },

                ].map((event, idx) => (
                    <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-gray-600">{event.date}</p>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {event.type}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CalenderSection
