import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { client, urlFor } from "../../utils/client";
import Loader from "../../Dashboard/user/components/utils/loader";

interface Family {
  _id: string;
  title: string;
  description: string;
  imgUrl: string;
  locationUrl: string;
}

const Breadcrumbs = ({ family }: { family: Family }) => (
  <nav className="container mx-auto px-4 py-4 text-gray-600 text-sm">
    <Link to="/" className="hover:underline">
      Home
    </Link>{" "}
    /
    <Link to="/families" className="hover:underline">
      {" "}
      Families
    </Link>{" "}
    /<span className="text-gray-900 font-semibold"> {family?.title}</span>
  </nav>
);

const SingleFamily = () => {
  const { id } = useParams<{ id: string }>();
  const [family, setFamily] = useState<Family | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const query = `*[_type == "families" && _id == "${id}"][0]`;
        const data = await client.fetch(query);
        setFamily(data);
      } catch (error) {
        console.error("Error fetching family details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFamily();
  }, [id]);

  if (loading) {
    return <Loader isLoading={loading} text="Get things ready..." />;
  }

  if (!family) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">Family not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs family={family} />

      {/* Header Section */}
      <section className="container mx-auto grid md:grid-cols-2 gap-6 px-4 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-blue-600 text-4xl font-bold uppercase">
            {family?.title}
          </h2>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            {family?.description}
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src={urlFor(family?.imgUrl).url()}
            alt="Family"
            className="w-full max-w-md rounded-lg shadow-xl"
          />
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 px-4 w-full flex flex-col items-center text-center">
        <div className="w-3/4 max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Location</h2>
          <div className="w-full">
            <img
              src={urlFor(family?.locationUrl).url()}
              alt="Family Location"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleFamily;
