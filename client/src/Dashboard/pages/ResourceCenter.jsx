import CalenderSection from "../CalenderSection";
import MinistryUpdates from "../MinistryUpdates"
import CommunicationHub from "../CommunicationHub"
const ResourceCenter = () => {

    const studyMaterials = [
        { name: "November Newsletter", url: "/downloads/november-newsletter.pdf" },
        { name: "Fundamental Beliefs", url: "/downloads/fundamental-beliefs.pdf" },
        { name: "Devotional Guide 2024", url: "/downloads/devotional-guide-2024.pdf" },
        { name: "Lesson Guide", url: "/downloads/lesson-guide" }
    ];

    const latestSermons = [
        {
            title: "Faith in Action",
            date: "November 26, 2024",
            youtubeUrl: "https://www.youtube.com/watch?v=abc123"
        },
        {
            title: "The Power of Prayer",
            date: "November 19, 2024",
            youtubeUrl: "https://www.youtube.com/watch?v=def456"
        },
        {
            title: "Walking in Grace",
            date: "November 12, 2024",
            youtubeUrl: "https://www.youtube.com/watch?v=ghi789"
        },
    ]


    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-8 mb-8 mt-16">
                <CalenderSection />
                <MinistryUpdates />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-medium mb-3">Latest Sermons</h4>
                    <ul className="space-y-2">
                        {/* Add sermon list items */}
                        {latestSermons.map((sermon, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                            >
                                <div>
                                    <strong>{sermon.title}</strong> - {sermon.date}
                                </div>
                                <a
                                    href={sermon.youtubeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-red-600 hover:text-red-800 flex items-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.75 9.75v4.5l3.5-2.25-3.5-2.25zM12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                                        />
                                    </svg>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-medium mb-3">Study Materials</h4>
                    <ul className="space-y-2">
                        {/* Add study materials */}
                        {studyMaterials.map((material, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                            >
                                <span className="font-medium">{material.name}</span>
                                <a
                                    href={material.url}
                                    download
                                    className="text-blue-600 hover:text-blue-800 flex items-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-5 h-5 mr-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                                        />
                                    </svg>
                                    Download
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <CommunicationHub />
        </div>
    )
}

export default ResourceCenter
