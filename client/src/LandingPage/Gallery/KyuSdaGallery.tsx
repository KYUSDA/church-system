import WSPGallery from "./Gallery";
import image1 from "../../assets/gallery/Adventist melody.JPG";
import image2 from "../../assets/departments/Alo.JPG";
import image3 from "../../assets/departments/communication.JPG";
import image4 from "../../assets/gallery/kyusdachurch.jpg";
import image5 from "../../assets/departments/masterguide.JPG";
import image6 from "../../assets/elders/pastorkyusda.jpeg";
import image7 from "../../assets/gallery/FootWashing.JPG";
import image8 from "../../assets/mission/mission4.jpeg";
import image9 from "../../assets/gallery/member6.jpeg";
import image10 from "../../assets/gallery/member7.jpeg";
import image11 from "../../assets/gallery/kyusda pic.JPG";
import image12 from "../../assets/gallery/gachia team.JPG";
import image13 from "../../assets/gallery/Music sabbath.JPG";
import image14 from "../../assets/gallery/chris.JPG";
import image15 from "../../assets/gallery/marionteam.JPG";
import image16 from "../../assets/departments/alo2.JPG";
import image17 from "../../assets/gallery/Aloamo.JPG";
import image18 from "../../assets/gallery/Gordonteam.JPG";
import image19 from "../../assets/gallery/vickyteam.JPG";
import { useEffect, useState } from "react";
import Loader from "../../Dashboard/user/components/utils/loader";

const KyuSda = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const galleryImages = [
    {
      img: image1,
    },
    {
      img: image2,
    },
    {
      img: image3,
    },
    {
      img: image4,
    },
    {
      img: image5,
    },
    {
      img: image13,
    },
    {
      img: image7,
    },
    {
      img: image8,
    },
    {
      img: image9,
    },
    {
      img: image10,
    },
    {
      img: image11,
    },
    {
      img: image12,
    },
    {
      img: image6,
    },
    {
      img: image14,
    },
    {
      img: image15,
    },
    {
      img: image16,
    },
    {
      img: image17,
    },
    {
      img: image18,
    },
    {
      img: image19,
    },
  ];

  return (
    <div className="my-6">
      <h2 className="text-center text-2xl md:text-4xl font-bold my-8 md:mt-12 md:mb-12">
        The <span className="text-blue-500">Memories</span> Archived
      </h2>

      <Loader isLoading={loading} text="Get Gallery ready..." />

      <WSPGallery galleryImages={galleryImages} />
    </div>
  );
};

export default KyuSda;
