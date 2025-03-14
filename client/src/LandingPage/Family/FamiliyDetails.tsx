
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { urlFor } from '../../utils/client';

interface Family {
  _id: string;
  title: string;
  description: string;
  imgUrl: string;
  locationUrl: string;
}

const Breadcrumbs = ({ family }: { family: Family }) => (
  <nav className="container mx-auto px-4 py-4 text-gray-600 text-sm">
    <Link to="/" className="hover:underline">Home</Link> /
    <Link to="/families" className="hover:underline"> Families</Link> /
    <span className="text-gray-900 font-semibold"> {family?.title}</span>
  </nav>
);

const SingleFamily = () => {
  const location = useLocation();
  const familyId = location.pathname.split('/')[2];
  const family = useSelector((state: { families: { families: Family[] } }) => state?.families?.families)?.find((fam) => fam?._id === familyId);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      {/* Breadcrumbs */}
      {family && <Breadcrumbs family={family} />}

      {/* Header Section */}
      <section className="container mx-auto grid md:grid-cols-2 gap-6 px-4 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-blue-600 text-4xl font-bold uppercase">{family?.title}</h2>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">{family?.description}</p>
        </div>
        <div className="flex justify-center">
          <img src={urlFor(family?.imgUrl).url()} alt="Family" className="w-full max-w-md rounded-lg shadow-xl" />
        </div>
      </section>

      {/* Map Section */}
    <section className="py-12 px-4 w-full flex flex-col items-center text-center">
    <div className="w-3/4 max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Location</h2>
        <div className="w-full">
        <img src={urlFor(family?.locationUrl).url()} alt="Family Location" className="w-full rounded-lg shadow-md" />
        </div>
    </div>
    </section>

    </div>
  );
};

export default SingleFamily;