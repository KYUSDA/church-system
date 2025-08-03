
import salaton from "../../assets/Salaton.jpg";
import joshua from "../../assets/Joshua pic.jpg";
import maxwell from "../../assets/maxwell.jpg";
import biko from "../../assets/biko.jpg";
import brown from "../../assets/brown.jpg";
import pastor from "../../assets/pastor.jpg"
import chriss from "../../assets/chriss.jpg"

const leaders = [
  { src: pastor, name: "Willis Obegi", role: "Our Pastor" },
];

const otherLeaders = [
  { src: joshua, name: "Joshua Hamisi", role: "First Elder" },
  { src: chriss, name: "Chris Salaton", role: "Elder" },
  { src: maxwell, name: "Maxwell Achola", role: "Elder" },
  { src: biko, name: "Steve Biko", role: "Elder" },
  { src: brown, name: "Lloyd  Brown", role: "Elder" },
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
