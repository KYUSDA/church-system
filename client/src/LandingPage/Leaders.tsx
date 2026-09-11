import charles from "../assets/elders/charles.jpeg"
import lameck from "../assets/elders/lameck.jpeg"
import kones from "../assets/elders/kones.jpeg"
import mwanga from "../assets/elders/shadrack.jpeg"
import genesis from "../assets/elders/og.jpeg"
import pastor from "../assets/elders/pastor.png"





const leaders = [
  { src: pastor, name: "Robert Odhiambo", role: "Our Pastor" },
];

const otherLeaders = [
  { src: charles, name: "Charles Mbugua", role: "First Elder" },
  { src: lameck, name: "Lameck Wafula", role: "Elder" },
  { src: kones, name: "Mordecai Kones", role: "Elder" },
  { src: mwanga, name: "Shadrack Mwanga", role: "Elder" },
  { src: genesis, name: "Genesis Otieno", role: "Elder" },
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
      <div className="flex justify-center mb-10">
        {leaders.map(({ src, name, role }, index) => (
          <div key={index} className="text-center w-56">
            <div className="w-56 h-64 overflow-hidden rounded-2xl shadow-md">
              <img
                src={src}
                alt={name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h5 className="text-lg font-semibold mt-3">{name}</h5>
            <p className="text-gray-500 text-sm">{role}</p>
          </div>
        ))}
      </div>

      {/* Other Leaders Row */}
      <div className="flex flex-wrap justify-center gap-6">
        {otherLeaders.map(({ src, name, role }, index) => (
          <div key={index} className="text-center w-44">
            <div className="w-44 h-52 overflow-hidden rounded-2xl shadow-md">
              <img
                src={src}
                alt={name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h5 className="text-lg font-semibold mt-3">{name}</h5>
            <p className="text-gray-500 text-sm">{role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaders;
