import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDepartmentById } from "../../utils/sanity_query";
import Loader from "../../Dashboard/user/components/utils/loader";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Activities from "./sections/Acitivities";
import Leaders from "./sections/Leaders";
import Videos from "./sections/Videos";
import Products from "./sections/Products";
import Images from "./sections/Images";
import Events from "./sections/Events";
import Resources from "./sections/Resources";
import Services from "./sections/Services";
import Theme from "./sections/Theme";

interface Department {
  _id: string;
  title: string;
  description?: string;
  imgUrl?: string;
  sections?: Array<{
    _type: string;
    _key: string;
    [key: string]: any;
  }>;
}

const DepartmentsDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getDepartmentById(id).then((data) => {
        setDepartment(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <Loader isLoading={loading} text="Get things ready..." />;
  }

  if (!department) {
    return <div className="text-center py-12">Department not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {department.sections?.map((section: any, index: number) => {
        switch (section._type) {
          case "heroSection":
            return <Hero key={section._key || index} data={section} />;
          case "aboutSection":
            return <About key={section._key || index} data={section} />;
          case "activitiesSection":
            return <Activities key={section._key || index} data={section} />;
          case "leadersSection":
            return <Leaders key={section._key || index} data={section} />;
          case "videosSection":
            return <Videos key={section._key || index} data={section} />;
          case "productsSection":
            return <Products key={section._key || index} data={section} />;
          case "imagesSection":
            return <Images key={section._key || index} data={section} />;
          case "eventsSection":
            return <Events key={section._key || index} data={section} />;
          case "resourcesSection":
            return <Resources key={section._key || index} data={section} />;
          case "servicesSection":
            return <Services key={section._key || index} data={section} />;
            case "themesSection":
              return <Theme key={section._key || index} data={section} />;
          // Add other section components here
          default:
            return null;
        }
      })}
    </div>
  );
};

export default DepartmentsDetails;
