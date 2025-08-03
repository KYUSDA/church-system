import WSPGallery from "./Gallery";
import image1 from "../../assets/Adventist melody.JPG";
import image2 from "../../assets/Alo.JPG";
import image3 from "../../assets/communication.JPG";
import image4 from "../../assets/kyusdachurch.jpg";
import image5 from "../../assets/masterguide.JPG";
import image6 from "../../assets/pastorkyusda.jpeg";
import image7 from "../../assets/FootWashing.JPG";
import image8 from "../../assets/mission4.jpeg";
import image9 from "../../assets/member6.jpeg";
import image10 from "../../assets/member7.jpeg";
import image11 from "../../assets/kyusda pic.JPG";
import image12 from "../../assets/gachia team.JPG";
import image13 from "../../assets/music 2.JPG";
import image14 from "../../assets/chris.JPG";
import image15 from "../../assets/marionteam.JPG";
import image16 from "../../assets/alo2.JPG";
import image17 from "../../assets/Aloamo.JPG";
import image18 from "../../assets/Gordonteam.JPG";
import image19 from "../../assets/vickyteam.JPG";
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
