
import Mainga from "../assets/elders/mainga.jpg";
import charles  from "../assets/elders/charles.jpg";
import steve from "../assets/elders/Bikosteve.jpg";
import brown from "../assets/elders/brown.jpg";
import pastor from "../assets/elders/pastor.jpg"
import ben from "../assets/elders/ben.jpg"

const leaders = [
  { src: pastor, name: "Willis Obegi", role: "Our Pastor" },
];

const otherLeaders = [
  { src: steve, name: "Steve Biko", role: "First Elder" },
  { src: Mainga, name: "Samuel Mainga", role: "Elder" },
  { src: ben, name: "Ben Samoita", role: "Elder" },
  { src: brown, name: "Lloyd  Brown", role: "Elder" },
  { src: charles, name: "Charles Mbugua", role: "Elder" },
];

function Leaders() {
  return (
    <div className="my-12 px-6 text-center w-full overflow-hidden">
      <header className="text-center my-8">
        <h1 className="text-3xl font-semibold text-gray-900 relative inline-block">
          Church <span className="text-blue-500 font-medium">LEADERS</span>
          <span className="block w-16 h-1 bg-blue-500 mt-1"></span>
        </h1>
        <p className="text-lg text-gray-600 mt-4">Meet our church leaders</p>
      </header>

      {/* Pastor Row (Centered) */}
      <div className="flex justify-center mb-8">
        {leaders.map(({ src, name, role }, index) => (
          <div key={index} className="p-4 w-48 text-center">
            <img src={src} alt={name} className="w-32 h-32 mx-auto rounded-full object-cover object-top" />
            <h5 className="text-lg font-semibold mt-4">{name}</h5>
            <p className="text-gray-500">{role}</p>
          </div>
        ))}
      </div>

      {/* Other Leaders Row */}
      <div className="flex flex-wrap justify-center gap-6">
        {otherLeaders.map(({ src, name, role }, index) => (
          <div key={index} className="p-4 w-48 text-center">
            <img src={src} alt={name} className="w-32 h-32 mx-auto rounded-full object-cover" />
            <h5 className="text-lg font-semibold mt-4">{name}</h5>
            <p className="text-gray-500">{role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaders;
