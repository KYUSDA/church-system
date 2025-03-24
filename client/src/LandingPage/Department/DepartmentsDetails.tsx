import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../../utils/client';
import Loader from '../../Dashboard/components/loader';

interface Department {
  _id: string;
  title: string;
  description?: string;
  imgUrl?: string;
}

const Breadcrumbs = ({ department }: { department: Department }) => (
  <nav className="container mx-auto px-4 py-4 text-gray-600 text-sm">
    <Link to="/" className="hover:underline">Home</Link> /
    <Link to="/departments" className="hover:underline"> Departments</Link> /
    <span className="text-gray-900 font-semibold"> {department?.title}</span>
  </nav>
);

const DepartmentsDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
}, []);


  useEffect(() => {
    if (id) {
      const query = `*[_type == "departments" && _id == "${id}"][0]`;
      client.fetch(query).then((data) => {
        setDepartment(data);
        setLoading(false);
      });
    }
  }, [id]);

   
  if (loading) {
    return  <Loader isLoading={loading} text="Get things ready..." />
  }

  if (!department) {
    return <div className="text-center py-12">Department not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs department={department} />

      {/* Header Section */}
      <section className="container mx-auto grid md:grid-cols-2 gap-6 px-4 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-blue-600 text-4xl font-bold uppercase">{department.title}</h2>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">{department.description}</p>
        </div>
        {department.imgUrl && (
          <div className="flex justify-center">
            <img src={urlFor(department.imgUrl).url()} alt="Department" className="w-full max-w-md rounded-lg shadow-xl" />
          </div>
        )}
      </section>
    </div>
  );
};

export default DepartmentsDetails;
